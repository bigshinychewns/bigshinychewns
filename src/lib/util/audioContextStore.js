import { writable } from 'svelte/store';

const { subscribe, set, update } = writable(
  undefined,
  (set) => {
    window.AudioContext = window.AudioContext
      || window.webkitAudioContext
      || navigator.mozAudioContext
      || navigator.msAudioContext;

    const newAudioContext = new window.AudioContext();
    // newAudioContext.resume();
    set(newAudioContext);

    return () => {
      newAudioContext.close();
    }
  }
);

const audioContextStore = { subscribe };

export default audioContextStore;
