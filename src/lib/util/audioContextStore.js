import { readable } from 'svelte/store';
import ABCjs from 'abcjs';

const { subscribe } = readable(
  undefined,
  (set) => {
    window.AudioContext = window.AudioContext
      || window.webkitAudioContext
      || navigator.mozAudioContext
      || navigator.msAudioContext;

    const newAudioContext =
      ABCjs.synth.activeAudioContext() || new window.AudioContext();

    newAudioContext.onstatechange = () => {};

    set(newAudioContext);
    return () => {};
  }
);

const audioContextStore = { subscribe };

export default audioContextStore;
