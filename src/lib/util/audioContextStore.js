import { readable } from 'svelte/store';

const { subscribe } = readable(
  undefined,
  (set) => {
    window.AudioContext = window.AudioContext
      || window.webkitAudioContext
      || navigator.mozAudioContext
      || navigator.msAudioContext;

    const newAudioContext = new window.AudioContext();
    set(newAudioContext);
    return () => {
      newAudioContext.close();
    };
  }
);

const audioContextStore = { subscribe };

export default audioContextStore;
