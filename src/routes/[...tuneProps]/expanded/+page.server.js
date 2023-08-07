import { decodeFromUrl } from '$lib/util/urlParams';
import { error } from '@sveltejs/kit';
import bigJson from 'big-json';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const [
		tuneNameEncoded,
		selectedVersionId,
		_expanded
	] = params.tuneProps.split('/');

	if (!tuneNameEncoded) {
		throw error(400, {
			message: 'Tune name not found'
		})
	}

	if (!selectedVersionId) {
		throw error(400, {
			message: 'Tune version not found'
		})
	}

	const tuneName = decodeFromUrl(tuneNameEncoded);

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

		console.log('--- whats in this directory: ---')
		fs.readdir(__dirname, function (err, files) {
			//handling error
			if (err) {
					return console.log('Unable to scan directory: ' + err);
			}
			//listing all files using forEach
			files.forEach(function (file) {
					// Do whatever you want to do with the file
					console.log(file);
			});
		});
		console.log('------')

		const readStream = fs.createReadStream(
			path.join(__dirname, '..', '..', '..', 'lib', 'tunesByTitle.json')
		);
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

	const tuneVersion = tuneVersions.find(t => t.setting_id == selectedVersionId);

	if (!tuneVersion) {
		throw error(404, {
			message: 'Tune version not found'
		});
	}

	return {
		tune: tuneVersion
	};
}
