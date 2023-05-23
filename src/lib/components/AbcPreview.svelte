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

	let abcFsm;

	const updateFsm = (newFsm) => {
		abcFsm = newFsm;
	};
	const handlePause = () => {
		abcFsm.pause();
	};
	const handlePlay = () => {
		abcFsm.play();
	};

	$: console.log('abcFsm: ', $abcFsm);
</script>

<div class="preview" class:parsing={abcFsm === undefined}>
	<div
		id="render-area"
		use:abcjsCanvas={{ abc, updateFsm }}
	/>
</div>
<div class="controls">
	{#if !!abcFsm}
		<div class="play-pause-container">
			{#if $abcFsm === 'audioPlaying'}
				<IconButton onClick={handlePause}>
					<PauseIcon />
				</IconButton>
			{:else}
				<IconButton onClick={handlePlay}>
					<PlayIcon />
				</IconButton>
			{/if}
		</div>
		<div class="expand-container">
			<a href={`${$page.url.pathname}/expanded`}>
				<ArrowsExpandIcon />
			</a>
		</div>
		<div>{$abcFsm.machine.current}</div>
	{/if}
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
