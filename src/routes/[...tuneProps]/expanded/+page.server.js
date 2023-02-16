import { decodeFromUrl } from '$lib/util/urlParams';
import { error } from '@sveltejs/kit';
import bigJson from 'big-json';
import fs from 'fs';

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
		const readStream = fs.createReadStream('src/lib/tunesByTitle.json');
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
