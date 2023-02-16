import { json } from '@sveltejs/kit';
import titles from '$lib/titles.json';

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders }) {
	setHeaders({
		'cache-control': 'max-age=86400',
	});

	return json(titles);
}
