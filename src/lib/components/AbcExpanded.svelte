<script>
	import AbcCursorControl from '$lib/util/AbcjsCursorControl';
	import abcjs from 'abcjs';
	import { onMount } from 'svelte';
	// import SaveButton from '$lib/components/SaveButton.svelte'
	import IconButton from '$lib/components/IconButton.svelte';
	import RewindIcon from '$lib/icons/RewindIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import DownArrowIcon from '$lib/icons/DownArrowIcon.svelte';
	import { savedTunes } from '$lib/util/stores';

	export let tuneAbc;
	export let showEditor;

	let abcjsVisualObj, audioContext, parsing, playing, renderArea, synth, synthControl, tempo;

	const onUnmount = () => {
		const activeAudioContext = abcjs.synth.activeAudioContext();
		activeAudioContext?.close();
	};

	const newAudioContext = () => {
		window.AudioContext =
			window.AudioContext ||
			window.webkitAudioContext ||
			navigator.mozAudioContext ||
			navigator.msAudioContext;
		const newAudioContext = new window.AudioContext();
		newAudioContext.resume();
		return newAudioContext;
	};

	onMount(() => {
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
			});
			onAudioChange();
		}
		return onUnmount;
	});

	const abcRenderOptions = {
		tablature: [{ instrument: 'violin' }],
		responsive: 'resize',
		add_classes: true
	};

	const onAudioChange = () => {
		parsing = true;
		if (synthControl) {
			synthControl.disable(true);
		}
		// Q:1/2=60\r\n

		const abcObj = abcjs.renderAbc(renderArea, `${tuneAbc}`, abcRenderOptions);
		abcjsVisualObj = abcObj[0];

		console.log('miliseconds per measure', abcjsVisualObj.millisecondsPerMeasure());
		renderArea.style.removeProperty('padding-bottom');
		renderArea.style.removeProperty('overflow');

		const textElms = renderArea.querySelectorAll(`text[font-family*='Times New Roman']`);

		Array.from(textElms).forEach((elm) => {
			elm.style.fontFamily = 'Copse';
		});

		const audioParams = {
			audioContext: audioContext,
			visualObj: abcjsVisualObj,
			qpm: tempo
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
							return Promise.resolve();
						});
				} else {
					console.log('no synth control??');
				}
			})
			.catch((error) => console.warn('Audio error:', error))
			.finally(() => (parsing = false));
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
	};

	const handleEdit = () => {
		showEditor = !showEditor;
	};

	const handleSave = () => {
		savedTunes.add(tuneAbc);
	};

	const togglePlayPause = () => (playing ? handlePause() : handlePlay());

	$: if (tempo && renderArea) {
		onAudioChange();
	}
</script>

<svelte:head>
	<link href="/styles/abcjs.css" rel="stylesheet" />
</svelte:head>

<section class="abc-expanded" class:hide={parsing}>
	<div id="renderArea" bind:this={renderArea} />
	<div class="fake-controls" />
	<div class="controls">
		<div class="edit-abc-container">
			<IconButton onClick={handleEdit}>
				<span class="abc-button">Abc</span>
			</IconButton>
		</div>
		<div class="rewind-container">
			<IconButton onClick={handleRewind}>
				<RewindIcon />
			</IconButton>
		</div>
		<div class="play-pause-container">
			<IconButton onClick={togglePlayPause}>
				{#if playing}
					<PauseIcon />
				{:else}
					<PlayIcon />
				{/if}
			</IconButton>
		</div>
		<div class="save-icon-container">
			<IconButton onClick={handleSave}>
				<DownArrowIcon />
			</IconButton>
		</div>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: calc(100vh - 9em) 4em;
		width: calc(100vw);
		border-top: 1em solid var(--dark);
		border-right: 1em solid var(--dark);
		border-left: 1em solid var(--dark);
	}
	#renderArea {
		background-color: var(--darkest);
		color: var(--lightest);
		overflow-y: scroll;
		height: calc(100vh - 9em);
		width: calc(100vw - 2em) !important;
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
		grid-area: 1 / 8 / 1 / 8;
	}
	.edit-abc-container {
		grid-area: 1 / 1 / 1 / 1;
	}
	.rewind-container {
		grid-area: 1 / 3 / 1 / 3;
	}
	.save-icon-container {
		grid-area: 1 / 10 / 1 / 10;
	}
	.abc-button {
		display: grid;
		place-items: center;
		color: var(--darkest);
		font-variant: small-caps;
		text-underline-offset: 0.2em;
		text-decoration: underline;
		font-weight: bold;
		font-size: 1.3em;
	}
</style>
