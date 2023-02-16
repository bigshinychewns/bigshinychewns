import { writable, asyncDerived, asyncReadable, persisted } from '@square/svelte-store';
import fuzzysort from 'fuzzysort';
import { page } from '$app/stores';
import { get } from '@square/svelte-store';
import { browser } from '$app/environment';

const remotetitlesStore = asyncReadable(
	[],
	async () => {
		console.log('retrieving titles...');
		const response = await fetch('/api/1.0/titles');
		const titles = await response.json();
		console.log('titles retrived');
		return titles;
	}
);

const titlesStore = browser ? persisted(remotetitlesStore, 'TITLES') : remotetitlesStore;

const searchQuery = writable('', set => {
	set(get(page).url.searchParams.get('q') || '');
	return () => { set('') };
});

const { store: searchResults, state: searchState } = asyncDerived(
	[searchQuery],
	async ([$searchQuery]) => {
		console.log('searching titles for', $searchQuery);
		const titles = await titlesStore.load();
		const results = await fuzzysort.go($searchQuery, titles, {
			limit: 20,
			threshold: -10000
		});
		console.log('search resuls', results)
		return Array.from(results);
	},
	{ trackState: true }
);

export {
	searchQuery,
	searchResults,
	searchState
};
