import { json, error } from '@sveltejs/kit';
import bigJson from 'big-json';
import fs from 'fs';
import { decodeFromUrl } from '$lib/util/urlParams';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, setHeaders }) {
	const encodedName = url.searchParams.get('q') || '';
	const name = decodeFromUrl(encodedName);

	if (!name) {
		throw error(422, {
			message: 'No query provided'
		});
	}

	const findTune = new Promise((resolve) => {
		const readStream = fs.createReadStream('src/lib/tunesByTitle.json');
		const parseStream = bigJson.createParseStream();

		parseStream.on('data', (tunesByTitle) => resolve(tunesByTitle[name]));

		readStream.pipe(parseStream);
	});

	/** @type {Session.Tune[]} */
	const tuneVersions = await findTune;
	if (!tuneVersions) {
		throw error(404, {
			message: 'Tune not found'
		});
	}

	// setHeaders({
	// 	'cache-control': 'max-age=86400',
	// });

	return json(tuneVersions);
}
