<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import ArrowsExpandIcon from '$lib/icons/ArrowsExpandIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import { page } from '$app/stores';
	import abcjsCanvas from '$lib/util/abcjsCanvas';
	import generateAbc from '$lib/util/generateAbc';
	import '$lib/styles/abcjs.css';

	export let tune;

	$: abc = generateAbc(tune);

	let playing = false;
	let parsing = true;
	let playFunc = () => {};
	let pauseFunc = () => {};

	const handlePlay = () => {
		playFunc();
		playing = true;
	};

	const handleStop = () => {
		pauseFunc();
		playing = false;
	};

	const handleClick = () => (playing ? handleStop() : handlePlay());

	const updateControls = ({play: newPlayFunc, pause: newPauseFunc}) => {
		if (newPlayFunc) {
			playFunc = newPlayFunc;
		}
		if (newPauseFunc) {
			pauseFunc = newPauseFunc;
		}
		parsing = false;
	}
</script>

<div class="preview" class:parsing>
	<div
		id="render-area"
		use:abcjsCanvas={{
			abc: abc,
			updateControls: updateControls,
		}}
	/>
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
		<a href={`${$page.url.pathname}/expanded`}>
			<ArrowsExpandIcon />
		</a>
	</div>
</div>

<style>

	.preview {
		grid-area: preview;
	}
	.controls {
		grid-area: controls;
	}

	#render-area {
		background-color: var(--darkest);
		color: var(--lightest);
		overflow-y: scroll;
		height: 100%;
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
</style>
