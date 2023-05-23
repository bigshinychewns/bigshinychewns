import { writable, derived } from 'svelte/store';
import { asyncReadable, persisted } from '@square/svelte-store';
import { browser } from '$app/environment'

const networkConnectionsStore = writable(0, () => {});
const networkActivity = {
	subscribe: networkConnectionsStore.subscribe,
	start: () => networkConnectionsStore.update(n => n + 1),
	stop: () => networkConnectionsStore.update(n => n - 1)
}

export const networkIsActive = derived(
	networkActivity,
	$networkActivity => ($networkActivity > 0)
);

export const getTuneStore = (name) => {
	const remoteTuneStore = asyncReadable(
		[],
		async () => {
			if (!name) {
				return [];
			}
			const path = `/api/1.0/tunes?${new URLSearchParams({ q: name })}`;
			networkActivity.start();
			const response = await fetch(path);
			networkActivity.stop();
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
