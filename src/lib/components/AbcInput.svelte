<script>
  import abcjs from 'abcjs';
  import { onMount } from 'svelte';

  export let abcInput = '';
  let renderArea, svg;
  let showExplanationDiv = false;
  let showErrorMessage = false;
  const abcRenderOptions = {
    tablature: [
      {
        instrument: 'violin',
      }
    ],
    responsive: "resize",
    add_classes: true,
    wrap: {
      minSpacing: 1.8,
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    }
  };

  function CursorControl() {
    const self = this;
    self.cursor = null;
    self.onStart = () => {
      svg = renderArea.querySelector('svg');
      this.cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
      this.cursor.setAttribute("class", "abcjs-cursor");
      this.cursor.setAttributeNS(null, 'x1', '0');
      this.cursor.setAttributeNS(null, 'y1', '0');
      this.cursor.setAttributeNS(null, 'x2', '0');
      this.cursor.setAttributeNS(null, 'y2', '0');
      svg.appendChild(this.cursor);
    };
    self.beatSubdivisions = 2;
    self.onBeat = (beatNumber, totalBeats, totalTime) => {
      beatInfo = `Beat: ${beatNumber} Total: ${totalBeats} Total time: ${totalTime}`;
    };
    self.onEvent = (event) => {
      if (event.measureStart && event.left === null) {
        return;
      }
      const lastSelection = renderArea.querySelectorAll('.highlight');
      for (let selection of lastSelection) {
        selection.classList.remove('highlight');
      }

      feedback = `Current Note: ${JSON.stringify(event, null, 2)}`;

      for (let note of event.elements) {
        for (let x of note) {
          x.classList.add('highlight');
        }
      }

      if (this.cursor) {
        this.cursor.setAttribute('x1', `${event.left - 2}`);
        this.cursor.setAttribute('x2', `${event.left - 2}`);
        this.cursor.setAttribute('y1', `${event.top}`);
        this.cursor.setAttribute('y2', `${event.top + event.height}`);
      }
    };
    self.onFinshed = () => {
      const highlights = renderArea.querySelectorAll('.highlight');
      for (let highlight of highlights) {
        highlight.classList.remove('highlight');
      }
      if (this.cursor) {
        this.cursor.setAttribute("x1", '0');
        this.cursor.setAttribute("x2", '0');
        this.cursor.setAttribute("y1", '0');
        this.cursor.setAttribute("y2", '0');
      }
    }
  }
  const cursorControl = new CursorControl;

  let statusMessages = [];
  let synth, visualObj, beatInfo, feedback, synthControl,
    defaultMsPm, chosenMsPm;

  const newAudioContext = () => {
    window.AudioContext = window.AudioContext ||
      window.webkitAudioContext ||
      navigator.mozAudioContext ||
      navigator.msAudioContext;
    const audioContext = new window.AudioContext();
    audioContext.resume();
    return audioContext;
  }

  onMount(() => {
    statusMessages = [...statusMessages, 'Testing Browser'];
    if (abcjs.synth.supportsAudio()) {
      synthControl = new abcjs.synth.SynthController();
      synthControl.load('#audio', cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true
      });
      onAudioChange();
    } else {
      showErrorMessage = true;
    }
  });
  const onAudioChange = () => {
    if(synthControl) {
      synthControl.disable(true);
    }
    visualObj = abcjs.renderAbc(
      "renderArea", abcInput, abcRenderOptions
    )[0];

    synth = new abcjs.synth.CreateSynth();
    console.log('pass in this visualObj', visualObj);
    defaultMsPm = visualObj.millisecondsPerMeasure();
  }
  $: chosenMsPm = defaultMsPm;

  $: if (synth) {
    const audioParams = {
      audioContext: newAudioContext(),
      visualObj: visualObj,
      millisecondsPerMeasure: 100,
      options: {
        pan: [ -0.5, 0.5 ]
      }
    };
    synth.init(audioParams).then((response) => {
      if (synthControl) {
        synthControl.setTune(visualObj, true, audioParams).catch((error) => {
          console.warn("Audio error:", error);
        });
      }
    });
  }
</script>

<style>
</style>

<svelte:head>
  <style>
    /* Some basic CSS to make the Audio controls in abcjs presentable. */

    .abcjs-inline-audio {
      height: 26px;
      padding: 0 5px;
      border-radius: 3px;
      background-color: #424242;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    .abcjs-inline-audio.abcjs-disabled {
      opacity: 0.5;
    }

    .abcjs-inline-audio .abcjs-btn {
      display: block;
      width: 28px;
      height: 34px;
      margin-right: 2px;
      padding: 7px 4px;

      background: none !important;
      border: 1px solid transparent;
      box-sizing: border-box;
    }

    .abcjs-btn g {
      fill: #f4f4f4;
      stroke: #f4f4f4;
    }

    .abcjs-inline-audio .abcjs-btn:hover g {
      fill: #cccccc;
      stroke: #cccccc;
    }

    .abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed {
      border: 1px solid #cccccc;
      background-color: #666666;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed {
      border: 1px solid #cccccc;
      background-color: #666666;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed {
      border: 1px solid #cccccc;
      background-color: #666666;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-midi-start .abcjs-pause-svg {
      display: none;
    }

    .abcjs-inline-audio .abcjs-midi-start .abcjs-loading-svg {
      display: none;
    }

    .abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-play-svg {
      display: none;
    }

    .abcjs-inline-audio .abcjs-midi-start.abcjs-loading .abcjs-play-svg {
      display: none;
    }

    .abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-pause-svg {
      display: block;
    }

    .abcjs-inline-audio .abcjs-midi-progress-background {
      background-color: #424242;
      height: 10px;
      border-radius: 5px;
      border: 2px solid #cccccc;
      margin: 0 8px 0 15px;
      position: relative;
      flex: 1;
      padding: 0;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-midi-progress-indicator {
      width: 20px;
      margin-left: -10px; /* half of the width */
      height: 14px;
      background-color: #f4f4f4;
      position: absolute;
      display: inline-block;
      border-radius: 6px;
      top: -4px;
      left: 0;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-midi-clock {
      margin-left: 4px;
      margin-top: 1px;
      margin-right: 2px;
      display: inline-block;
      font-family: sans-serif;
      font-size: 16px;
      box-sizing: border-box;
      color: #f4f4f4;
    }

    .abcjs-inline-audio .abcjs-tempo-wrapper {
      font-size: 10px;
      color: #f4f4f4;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    .abcjs-inline-audio .abcjs-midi-tempo {
      border-radius: 2px;
      border: none;
      margin: 0 2px 0 4px;
      width: 42px;
      padding-left: 2px;
      box-sizing: border-box;
    }

    .abcjs-inline-audio .abcjs-loading .abcjs-loading-svg {
      display: inherit;
    }

    .abcjs-inline-audio .abcjs-loading {
      outline: none;
      animation-name: abcjs-spin;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

    }
    .abcjs-inline-audio .abcjs-loading-svg circle {
      stroke: #f4f4f4;
    }

    @keyframes abcjs-spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
    }

    /* Adding the class "abcjs-large" will make the control easier on a touch device. */
    .abcjs-large .abcjs-inline-audio {
      height: 52px;
    }
    .abcjs-large .abcjs-btn {
      width: 56px;
      height: 52px;
      font-size: 28px;
      padding: 6px 8px;
    }
    .abcjs-large .abcjs-midi-progress-background {
      height: 20px;
      border: 4px solid #cccccc;
    }
    .abcjs-large .abcjs-midi-progress-indicator {
      height: 28px;
      top: -8px;
      width: 40px;
    }
    .abcjs-large .abcjs-midi-clock {
      font-size: 32px;
      margin-right: 10px;
      margin-left: 10px;
      margin-top: -1px;
    }
    .abcjs-large .abcjs-midi-tempo {
      font-size: 20px;
      width: 50px;
    }
    .abcjs-large .abcjs-tempo-wrapper {
      font-size: 20px;
    }

    .abcjs-css-warning {
      display: none;
    }

    .highlight {
      color: red;
    }
  </style>
</svelte:head>

<textarea
  id="abc"
  cols="80"
  rows="12"
  bind:value={abcInput}
  spellcheck="false"
  on:input={onAudioChange}
/>
<div id="warnings">No errors</div>
<div class="container">
  <div id="renderArea" bind:this={renderArea}></div>
  <div id="audio"></div>
  <input type='range' min={1} max={defaultMsPm * 2} value={chosenMsPm} />
  <div>{beatInfo}</div>
  <pre>{feedback}</pre>
  {#if showExplanationDiv}
    <p>
      Browsers won't allow audio to work unless the audio is started in response to a
      user action. This prevents auto-playing web sites. Therefore, the
      following button is needed to do the initialization:
    </p>
  {/if}
  <div class="row">
    <div>
      {#if showErrorMessage}
        <div class="error">
          Audio is not supported in this browser.
        </div>
      {/if}
    </div>
    <div>
      {#each statusMessages as msg}
        <div>{msg}</div>
      {/each}
    </div>
  </div>
</div>
