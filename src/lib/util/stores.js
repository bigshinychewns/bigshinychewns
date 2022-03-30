import { writable } from 'svelte/store';

const searchQuery = writable('');
const selectedTune = writable('');
const selectedTuneVersions = writable([]);
const selectedTuneVersion = writable();
const searchResults = writable();
const tuneAbc = writable('');
const tuneVersionIndex = writable();

export {
  searchQuery,
  selectedTune,
  selectedTuneVersions,
  selectedTuneVersion,
  searchResults,
  tuneAbc,
  tuneVersionIndex
};
