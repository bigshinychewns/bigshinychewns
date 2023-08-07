import { json, error } from '@sveltejs/kit';
import bigJson from 'big-json';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
		let __path;
		try {
			__path = PATH
		} catch (error) {
			__path = 'no path'
		}
		console.log('PATH:');
		console.log(__path);

		console.log('import.meta.url:');
		console.log(import.meta.url);

		const __filename = fileURLToPath(import.meta.url);

		console.log('fileURLToPath(import.meta.url):');
		console.log(__filename);
		const __dirname = path.dirname(__filename);

		console.log('path.dirname(__filename):');
		console.log(__dirname);
		const readStream = fs.createReadStream(
			path.join(__dirname, '..', '..', '..', '..', 'lib', 'tunesByTitle.json')
		);

		// const readStream = fs.createReadStream('src/lib/tunesByTitle.json');
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

	setHeaders({
		'cache-control': 'max-age=86400',
	});

	return json(tuneVersions);
}
