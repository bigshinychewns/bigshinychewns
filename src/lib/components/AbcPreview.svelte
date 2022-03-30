<script>
  import abcjs from 'abcjs';
  import { onMount } from 'svelte';
  import fsm from '$lib/util/fsm';
  import { tuneAbc } from '$lib/util/stores';
  import ExpandButton from '$lib/components/ExpandButton.svelte';
  import PlayPauseButton from './PlayPauseButton.svelte';

  let renderArea, synth, abcjsVisualObj, audioError;
  let playing = false;
  let parsing = false;

  const onUnmount = () => {
    const activeAudioContext = abcjs.synth.activeAudioContext();
    activeAudioContext?.close();
  };

  onMount(() => {
    console.log('AbcPreview onMount');
    if (abcjs.synth.supportsAudio()) {
      onAudioChange();
    }
    return onUnmount;
  });

  const newAudioContext = () => {
    window.AudioContext = window.AudioContext ||
      window.webkitAudioContext ||
      navigator.mozAudioContext ||
      navigator.msAudioContext;
    const audioContext = new window.AudioContext();
    audioContext.resume();
    return audioContext;
  }

  const abcRenderOptions = {
    responsive: "resize",
  };

  const onAudioChange = () => {
    parsing = true;
    handleStop();
    console.log('onAudioChange', $tuneAbc);
    abcjsVisualObj = abcjs.renderAbc(
      renderArea, $tuneAbc, abcRenderOptions
    )[0];
    renderArea.style.removeProperty('padding-bottom');
    renderArea.style.removeProperty('overflow');
    const textElms = renderArea.querySelectorAll(
      `text[font-family*='Times New Roman']`
    );
    Array.from(textElms).forEach((elm) => {
      elm.style.fontFamily = 'Copse';
    });

    synth = new abcjs.synth.CreateSynth();
    console.log('initializing...');
    console.log('millisecondsPerMeasure:', abcjsVisualObj.millisecondsPerMeasure());
    synth.init({
      visualObj: abcjsVisualObj,
      audioContext: newAudioContext(),
      millisecondsPerMeasure: abcjsVisualObj.millisecondsPerMeasure()
    }).then(() =>{
      console.log('priming...');
      synth.prime()
    }).then(() => {
      console.log('signal success, calling parseAbcSuccess...');
      fsm.parseAbcSuccess();
      console.log('did it work?');
      return Promise.resolve();
    }).catch((error) => {
      audioError = error;
      console.warn("Synth Error: ", error);
    }).finally(() => {
      parsing = false;
    });
  }

  const handlePlay = () => {
    if (synth) {
      synth.start();
    }
    playing = true;
  }

  const handleStop = () => {
    if (synth) {
      synth.stop();
    }
    playing = false;
  }

  const handleClick = () => playing ? handleStop() : handlePlay();
</script>

<style>
  section {
    display: grid;
    grid-template-rows: 474px 60px;
    grid-area: 1 / 1 / 2 / 2;
  }
  #renderArea {
    background-color: var(--darkest);
    color: var(--lightest);
    overflow-y: scroll;
    height: 474px;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(9, 50px);
    background-color: var(--light);
    place-items: center;
  }
  button {
    display: grid;
    place-items: center;
  }
  .parsing {
    display:none;
  }
  .play-pause-container {
    grid-area: 1 / 5 / 1 / 5;
  }
  .expand-container {
    grid-area: 1 / 9 / 1 / 9;
  }
</style>

<svelte:head>
  <link href="/styles/abcjs.css" rel="stylesheet">
</svelte:head>

<section class="abc-preview" class:parsing>
  <div>
    <div id="renderArea" bind:this={renderArea}/>
  </div>
  <div class="controls">
    <div class="play-pause-container">
      <PlayPauseButton {handleClick} {playing} />
    </div>
    <div class="expand-container">
      <ExpandButton />
    </div>
  </div>
</section>
