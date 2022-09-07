import svelteFsm from 'svelte-fsm';
import { get } from 'svelte/store';
import {
	fetchSessionTune,
	fetchSessionTuneAbc,
	searchSession,
} from '$lib/util/theSession';
import {
	searchQuery,
	selectedTune,
	selectedTuneVersions,
	selectedTuneVersion,
	searchResults,
	tuneAbc,
	tuneVersionIndex
} from '$lib/util/stores';

const emptyController = {signal: '', abort() {}}

const [
	searchFetchController,
	versionsFetchController,
	abcFetchController
] = (typeof AbortController === 'undefined')
	? [emptyController, emptyController, emptyController]
	: [new AbortController(), new AbortController(), new AbortController()];

const searchSignal = searchFetchController.signal;
const versionsSignal = versionsFetchController.signal;
const abcSignal = abcFetchController.signal;

const searchAction = (query) => {
	searchQuery.set(query);
	return 'awaitSearchResults';
};

const selectTuneAction = (tune) => {
	selectedTune.set(tune);
	return 'awaitTuneVersions'
};

const selectTuneVersionAction = (version, versionIndex) => {
	// console.log('displayTuneVersions, selectTuneVersion', version, versionIndex);
	selectedTuneVersion.set(version);
	tuneVersionIndex.set(versionIndex);
	return 'awaitTuneAbc';
}

const fsm = svelteFsm('start', {
	start: {
		search: searchAction
	},
	awaitSearchResults: {
		_enter() {
			console.log('awaitSearchResults _enter');
			searchSession(get(searchQuery), 1, searchSignal).then(this.searchSuccess);
		},
		searchSuccess(results) {
			searchResults.set(results);
			return 'displaySearchResults';
		},
		back() {
			searchFetchController.abort();
			return 'start';
		}
	},
	displaySearchResults: {
		_enter() {
			console.log('displaySearchResults _enter');
		},
		search: searchAction,
		selectTune: selectTuneAction
	},
	awaitTuneVersions: {
		_enter() {
			console.log('awaitTuneVersions _enter');
			fetchSessionTune(get(selectedTune).url, versionsSignal).then(
				this.tuneVersionsSuccess
			);
		},
		tuneVersionsSuccess(result) {
			console.log('awaitTuneVersions tuneVersionsSuccess', result);

			selectedTuneVersions.set(result.settings);
			return 'displayTuneVersions';
		},
		back() {
			console.log('awaitTuneVersions back');
			versionsFetchController.abort();
			return 'displaySeachResults';
		}
	},
	displayTuneVersions: {
		_enter(){
			console.log('displayTuneVersions _enter');
		},
		selectTuneVersion: selectTuneVersionAction,
		search: searchAction,
		back: 'displaySearchResults'
	},
	awaitTuneAbc: {
		_enter() {
			console.log('awaitTuneAbc _enter');
			let tuneUrl = new URL(get(selectedTuneVersion).url);
			tuneUrl.hash = '';
			fetchSessionTuneAbc(
				tuneUrl.toString(),
				get(tuneVersionIndex),
				abcSignal
			).then(this.tuneAbcSuccess);
		},
		back() {
			console.log('awaitTuneAbc back');

			abcFetchController.abort();
			return 'displayTuneVersions';
		},
		tuneAbcSuccess(result) {
			console.log('awaitTuneAbc tuneAbcSuccess', result);

			tuneAbc.set(result);
			return 'parseAbcForPreview';
		}
	},
	parseAbcForPreview: {
		_enter() {
			console.log('parseAbcForPreview _enter');
		},
		parseAbcSuccess: 'previewTune'
	},
	previewTune: {
		_enter() {
			console.log('previewTune _enter');
		},
		expandTune: 'parseAbcForExpanded',
		search: 'awaitSearchResults',
		selectTuneVersion: selectTuneVersionAction,
		back: 'displaySearchResults'
	},
	parseAbcForExpanded: {
		parseAbcSuccess: 'expandedTune',
		back: 'parseAbcForPreview'
	},
	expandedTune: {
		back: 'parseAbcForPreview',
		adjustTuneSettings: 'parseAbcForExpanded',
		edit: 'abcEditor'
	},
	abcEditor: {
		save(newTuneAbc) {
			tuneAbc.set(newTuneAbc);
			return 'parseAbcForExpanded';
		},
		back: 'parseAbcForExpanded'
	}
});

export default fsm;
