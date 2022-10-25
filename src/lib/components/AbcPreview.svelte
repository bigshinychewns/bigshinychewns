<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import ArrowsExpandIcon from '$lib/icons/ArrowsExpandIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import { page } from '$app/stores';
	import abcjsCanvas from '$lib/util/abcjsCanvas';

	let _empty, origin, query, tune, tuneId, hrefBase;
	$: [_empty, origin, query, tune, tuneId] = $page.url.pathname.split('/');
	$: hrefBase = `/${origin}/${query}/${tune}/${tuneId}`;

	export let abc;

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

<svelte:head>
	<link href="/styles/abcjs.css" rel="stylesheet" />
</svelte:head>

<section class="abc-preview" class:parsing>
	<div class="">
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
		position: sticky;
		bottom: calc(0 + env(safe-area-inset-bottom, 0));
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
