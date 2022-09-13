<script>
	import abcjs from 'abcjs';
	import { onMount, beforeUpdate } from 'svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import ArrowsExpandIcon from '$lib/icons/ArrowsExpandIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import { page } from '$app/stores';

	let _empty, origin, query, tune, tuneId, hrefBase;
	$: [_empty, origin, query, tune, tuneId] = $page.url.pathname.split('/');
	$: hrefBase = `/${origin}/${query}/${tune}/${tuneId}`;

	export let abc;

	let renderArea, synth, abcjsVisualObj, audioError;
	let playing = false;
	let parsing = false;

	const onUnmount = () => {
		const activeAudioContext = abcjs.synth.activeAudioContext();
		activeAudioContext?.close();
	};

	onMount(() => {
		console.log('AbcPreview onMount');
		// if (abcjs.synth.supportsAudio()) {
		//   onAudioChange();
		// }
		return onUnmount;
	});

	const newAudioContext = () => {
		window.AudioContext =
			window.AudioContext ||
			window.webkitAudioContext ||
			navigator.mozAudioContext ||
			navigator.msAudioContext;
		const audioContext = new window.AudioContext();
		audioContext.resume();
		return audioContext;
	};

	const abcRenderOptions = {
		responsive: 'resize'
	};

	const handlePlay = () => {
		if (synth) {
			synth.start();
		}
		playing = true;
	};

	const handleStop = () => {
		if (synth) {
			synth.stop();
		}
		playing = false;
	};

	const handleClick = () => (playing ? handleStop() : handlePlay());

	// const onAudioChange = () => {
	$: {
		if (abc && renderArea) {
			parsing = true;
			handleStop();
			abcjsVisualObj = abcjs.renderAbc(renderArea, abc, abcRenderOptions)[0];
			if (renderArea) {
				renderArea.style.removeProperty('padding-bottom');
				renderArea.style.removeProperty('overflow');
				const textElms = renderArea.querySelectorAll(`text[font-family*='Times New Roman']`);
				Array.from(textElms).forEach((elm) => {
					elm.style.fontFamily = 'Copse';
				});
			}

			synth = new abcjs.synth.CreateSynth();
			console.log('initializing...');
			console.log('millisecondsPerMeasure:', abcjsVisualObj.millisecondsPerMeasure());
			synth
				.init({
					visualObj: abcjsVisualObj,
					audioContext: newAudioContext(),
					millisecondsPerMeasure: abcjsVisualObj.millisecondsPerMeasure()
				})
				.then(() => {
					console.log('priming...');
					synth.prime();
				})
				.then(() => {
					console.log('signal success, calling parseAbcSuccess...');
					return Promise.resolve();
				})
				.catch((error) => {
					audioError = error;
					console.warn('Synth Error: ', error);
				})
				.finally(() => {
					parsing = false;
				});
		}
	}
</script>

<svelte:head>
	<link href="/styles/abcjs.css" rel="stylesheet" />
</svelte:head>

<section class="abc-preview" class:parsing>
	<div class="">
		<div id="render-area" bind:this={renderArea} />
	</div>
	<div class="controls">
		<div class="play-pause-container">
			<IconButton onClick={handleClick}>
				{#if playing}
					<PauseIcon />
				{:else}
					<PlayIcon />
				{/if}
			</IconButton>
		</div>
		<div class="expand-container">
			<a href={`${hrefBase}/expanded`}>
				<ArrowsExpandIcon />
			</a>
		</div>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: 1fr 4em;
		height: 100%;
	}
	#render-area {
		background-color: var(--darkest);
		color: var(--lightest);
		overflow-y: scroll;
		height: 100%;
		max-width: calc(100vw - 4em);
	}
	.controls {
		display: grid;
		grid-auto-columns: 1fr;
		background-color: var(--light);
		place-items: center;
		padding: 0.5em;
	}
	.parsing {
		display: none;
	}
	.play-pause-container {
		grid-area: 1 / 5 / 1 / 5;
	}
	.expand-container {
		grid-area: 1 / 9 / 1 / 9;
	}
	a {
		color: var(--darkest);
	}
</style>
