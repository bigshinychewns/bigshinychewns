import fuzzysort from 'fuzzysort';
import tuneTitles from '$lib/titlesFixed.json';
import { decodeFromUrl } from '$lib/util/urlParams';
import { error } from '@sveltejs/kit';
import bigJson from 'big-json';
import fs from 'fs';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url, params }) {
	let response = {};

	// deal with searching
	const query = url.searchParams.get('q');
	if (query) {
		const searchResults = fuzzysort.go(query, tuneTitles, {
			limit: 20,
			threshold: -10000,
		});

		response.searchResults = Array.from(searchResults);
	}

	// account for url params
	const [tuneNameEncoded, selectedVersionId] = params.tuneProps.split('/')

	// find all versions if a tune is selected
	if (tuneNameEncoded) {
		const tuneName = decodeFromUrl(tuneNameEncoded);

		const findTune = new Promise((resolve) => {
			const readStream = fs.createReadStream('src/lib/tunesByTitleFixed.json');
			const parseStream = bigJson.createParseStream();

			parseStream.on('data', (tunesByTitle) => {
				resolve(tunesByTitle[tuneName]);
			});

			readStream.pipe(parseStream);
		});

		/** @type {Session.Tune[]} */
		const tuneVersions = await findTune;
		if (!tuneVersions) {
			throw error(404, {
				message: 'Tune not found'
			});
		}

		response.tuneVersions = tuneVersions;
	}

	// grab the selected tune version if the id exists
	if (selectedVersionId) {
		const selectedVersion = response.tuneVersions?.find(
			t => t.setting_id == selectedVersionId
		);

		if(!selectedVersion) {
			throw error(404, {
				message: 'Tune version not found'
			});
		}
		response.selectedVersion = selectedVersion;
	}

	return response;
}
