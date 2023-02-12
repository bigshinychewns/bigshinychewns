import fuzzysort from 'fuzzysort';
import tunesOptimized from '$lib/tunesOptimized.json';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const query = url.searchParams.get('q');
	if (query) {
		const results = fuzzysort.go(query, tunesOptimized, {
			limit: 100,
			threshold: -10000,
			key: 'preparedName'
		});

		return { results };
	}
}
