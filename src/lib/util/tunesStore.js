import { asyncReadable, persisted } from '@square/svelte-store';
import { browser } from '$app/environment'

export const getTuneStore = (name) => {
	const remoteTuneStore = asyncReadable(
		[],
		async () => {
			if (!name) {
				return [];
			}
			const path = `/api/1.0/tunes?${new URLSearchParams({ q: name })}`;
			const response = await fetch(path);
			if (response.ok) {
				const tune = await response.json();
				return tune;
			} else {
				return [];
			}
		}
	);

	const tuneStore = persisted(
		remoteTuneStore,
		`TUNE_${name.toUpperCase().replaceAll(' ', '_')}`
	);

	return browser ? tuneStore : remoteTuneStore;
};
