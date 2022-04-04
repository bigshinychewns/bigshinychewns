<script>
  import AbcCursorControl from "$lib/util/AbcjsCursorControl";
  import fsm from "$lib/util/fsm";
  import { tuneAbc } from '$lib/util/stores';
  import abcjs from 'abcjs';
  import { onMount } from 'svelte';
  import PlayPauseButton from './PlayPauseButton.svelte';
  import AbcjsTempoControl from './AbcjsTempoControl.svelte'
  import EditAbcButton from "./EditAbcButton.svelte";
  import RewindButton from "./RewindButton.svelte";

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
        console.log('init complete...');
        if (synthControl) {
          console.log('found synthcontrol');
          synthControl
            .setTune(abcjsVisualObj, true, audioParams)
              .then((arg) => {
                console.log('return from setTune:', arg);
                return synth.prime();
              })
              .then((arg) => {
                console.log('return from prime:', arg);
                fsm.parseAbcSuccess()
                return Promise.resolve();
              });
        } else {
          console.log('no synth control??');
        }
      })
      .catch((error) => console.warn('Audio error:', error))
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

  const handleRewind = () => {
    if (synthControl) {
      synthControl.restart();
    }
  }

  const togglePlayPause = () => playing ? handlePause() : handlePlay();

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
    --highlight-color: red;
    color: var(--highlight-color);
    filter: drop-shadow(0px 0px 3px var(--highlight-color));
  }
  #renderArea :global(g) {
    transition: color 200ms linear, filter 200ms linear;
  }
  .controls {
    background-color: var(--light);
    display: grid;
    grid-template-columns: repeat(9, 50px);
    place-items: center;
  }
  .hide {
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
  .rewind-container {
    grid-area: 1 / 3 / 1 / 3;
  }
</style>

<svelte:head>
  <link href="/styles/abcjs.css" rel="stylesheet">
</svelte:head>

<section class="expanded-abc" class:hide={parsing || $fsm == 'abcEditor'}>
  <div id="renderArea" bind:this={renderArea}/>
  <div class="fake-controls" />
  <div class="controls">
    <div class="edit-abc-container">
      <EditAbcButton />
    </div>
    <div class="rewind-container">
      <RewindButton onClick={handleRewind}/>
    </div>
    <div class="play-pause-container">
      <PlayPauseButton handleClick={togglePlayPause} {playing} />
    </div>
    <div class="tempo-control-container">
      <AbcjsTempoControl bind:value={tempoPercent} />
    </div>
  </div>
</section>
