import { writable } from 'svelte/store';

const searchQuery = writable('');
const selectedTune = writable('');
const selectedTuneVersions = writable([]);
const selectedTuneVersion = writable();
const searchResults = writable();
const tuneAbc = writable('');
const tuneVersionIndex = writable();

const { tunesSubscribe, tunesSet, tunesUpdate } = writable([], (set) => {
  // const initialSavedTunes = JSON.parse(localStorage.getItem('tunes'));
  const initialSavedTunes = localStorage.getItem('tunes');
  set(initialSavedTunes || '');
});

const savedTunes = {
  subscribe: tunesSubscribe,
  set: (newSavedTunes) => {
    const newSavedTunesString = JSON.stringify(newSavedTunes);
    localStorage.setItem('tunes', newSavedTunesString);
    tunesSet(newSavedTunes);
  },
  add: (newTune) => {
    tunesUpdate((prev) => {
      // const newTunes = [...prev, newTune];
      const newTunes = `${prev}\n\n${newTune}`;
      // localStorage.setItem('tunes', JSON.stringify(newTunes));
      localStorage.setItem('tunes', newTunes);
      return newTunes;
    })
  },
  remove: (index) => {
    tunesUpdate((prev) => {
      const newTunes = prev.filter((_, i) => i !== index);
      localStorage.setItem('tunes', JSON.stringify(newTunes));
      return newTunes;
    })
  }
}

export {
  searchQuery,
  selectedTune,
  selectedTuneVersions,
  selectedTuneVersion,
  searchResults,
  tuneAbc,
  tuneVersionIndex,
  savedTunes
};
