<script>
  import AbcCursorControl from "$lib/util/AbcjsCursorControl";
  import fsm from "$lib/util/fsm";
  import { tuneAbc } from '$lib/util/stores';
  import abcjs from 'abcjs';
  import { onMount } from 'svelte';
  import PlayPauseButton from './PlayPauseButton.svelte';
  import AbcjsTempoControl from './AbcjsTempoControl.svelte'
  import EditAbcButton from "./EditAbcButton.svelte";

  let abcjsVisualObj,
    audioContext,
    parsing,
    playing,
    renderArea,
    synth,
    synthControl,
    tempoPercent;

  const onUnmount = () => {
    const activeAudioContext = abcjs.synth.activeAudioContext();
    activeAudioContext?.close();
  };

  const newAudioContext = () => {
    window.AudioContext = window.AudioContext ||
      window.webkitAudioContext ||
      navigator.mozAudioContext ||
      navigator.msAudioContext;
    const newAudioContext = new window.AudioContext();
    newAudioContext.resume();
    return newAudioContext;
  };

  onMount(() => {
    console.log('AbcExpanded onMount');
    if (abcjs.synth.supportsAudio()) {
      audioContext = newAudioContext();
      const cursorControl = new AbcCursorControl(renderArea);
      synthControl = new abcjs.synth.SynthController();
      synthControl.load('.fake-controls', cursorControl, {
        displayLoop: false,
        displayRestart: false,
        displayPlay: false,
        displayProgress: false,
        displayWarp: false
      })
      onAudioChange();
    }
    return onUnmount;
  });

  const abcRenderOptions = {
    tablature: [
      { instrument: 'violin' }
    ],
    responsive: "resize",
    add_classes: true,
    wrap: {
      minSpacing: 1.8,
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    }
  };

  const onAudioChange = () => {
    parsing = true;
    if (synthControl) {
      synthControl.disable(true);
    }
// Q:1/2=60\r\n
    abcjsVisualObj = abcjs.renderAbc(
      renderArea, `${$tuneAbc}`, abcRenderOptions
    )[0];

    console.log('miliseconds per measure', abcjsVisualObj.millisecondsPerMeasure());
    renderArea.style.removeProperty('padding-bottom');
    renderArea.style.removeProperty('overflow');

    const textElms = renderArea.querySelectorAll(
      `text[font-family*='Times New Roman']`
    );
    Array.from(textElms).forEach((elm) => {
      elm.style.fontFamily = 'Copse';
    });

    const audioParams = {
      audioContext: audioContext,
      visualObj: abcjsVisualObj,
      millisecondsPerMaeasure: abcjsVisualObj.millisecondsPerMeasure()
    };

    synth = new abcjs.synth.CreateSynth();
    synth
      .init(audioParams)
      .then((_response) => {
        if (synthControl) {
          synthControl.setTune(abcjsVisualObj, true, audioParams)
            .catch((error) => console.warn('Audio error:', error));
        }
      })
      .then(() => synth.prime())
      .then(() => {
        fsm.parseAbcSuccess()
        return Promise.resolve();
      })
      .catch((error) => console.warn('Synth Error:', error))
      .finally(() => parsing = false);
  };

  const handlePlay = () => {
    if (synthControl) {
      synthControl.play();
    }
    playing = true;
  };

  const handlePause = () => {
    if (synthControl) {
      synthControl.pause();
    }
    playing = false;
  };

  const handleClick = () => playing ? handlePause() : handlePlay();

  // const handleTempoChange = (newTempo) {

  // };

  // $: if (synthControl) {
  //     synthControl.setWarp(tempoPercent);
  //   }
</script>

<style>
  section {
    display: grid;
    grid-template-rows: 474px 60px;
    width: 100%;
  }
  #renderArea {
    background-color: var(--darkest);
    color: var(--lightest);
    overflow-y: scroll;
    height: 474px;
  }
  #renderArea :global(.highlight) {
    color: red;
  }
  .controls {
    background-color: var(--light);
    display: grid;
    grid-template-columns: repeat(9, 50px);
    place-items: center;
  }
  .parsing {
    display: none;
  }
  .fake-controls {
    display: none;
  }
  .play-pause-container {
    grid-area: 1 / 5 / 1 / 5;
  }
  .tempo-control-container {
    grid-area:1 / 8 / 1 / 8;
  }
  .edit-abc-container {
    grid-area:1 / 1 / 1 / 1;
  }
</style>

<svelte:head>
  <link href="/styles/abcjs.css" rel="stylesheet">
</svelte:head>

<section class="expanded-abc" class:parsing>
  <div id="renderArea" bind:this={renderArea}/>
  <div class="fake-controls" />
  <div class="controls">
    <div class="play-pause-container">
      <PlayPauseButton {handleClick} {playing} />
    </div>
    <div class="tempo-control-container">
      <AbcjsTempoControl bind:value={tempoPercent} />
    </div>
    <div class="edit-abc-container">
      <EditAbcButton />
    </div>
</div>
</section>
