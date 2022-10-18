<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import RewindIcon from '$lib/icons/RewindIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import DownArrowIcon from '$lib/icons/DownArrowIcon.svelte';
	import MinusIcon from '$lib/icons/MinusIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import abcjsCanvas from '$lib/util/abcjsCanvas';

	export let abc;
	export let showEditor;

	let playing = false;
	let parsing = true;
	let playFunc = () => {};
	let pauseFunc = () => {};
	let rewindFunc = () => {};

	let halfNoteTempo = 80;

	const handlePlay = async () => {
		playFunc();
		playing = true;
	};

	const handlePause = () => {
		pauseFunc();
		playing = false;
	};

	const handleRewind = () => {
		rewindFunc();
		playing = false;
	};

	const handleEdit = () => {
		// showEditor = !showEditor;
	};

	const handleSave = () => {
		// savedTunes.add(abc);
	};

	const togglePlayPause = () => (playing ? handlePause() : handlePlay());

	const decreaseTempo = async () => {
		halfNoteTempo = halfNoteTempo - 5;
		playing = false;
	}

	const increaseTempo = async () => {
		halfNoteTempo = halfNoteTempo + 5;
		playing = false;
	}

	const updateControls = ({
		play: newPlayFunc,
		pause: newPauseFunc,
		rewind: newRewindFunc
	}) => {
		if (newPlayFunc) {
			playFunc = newPlayFunc;
		}
		if (newPauseFunc) {
			pauseFunc = newPauseFunc;
		}
		if (newRewindFunc) {
			rewindFunc = newRewindFunc;
		}
		parsing = false;
	}
</script>

<svelte:head>
	<link href="/styles/abcjs.css" rel="stylesheet" />
</svelte:head>

<section class="abc-expanded" class:hide={parsing}>
	<div
		id="renderArea"
		use:abcjsCanvas={{
			abc,
			updateControls,
			halfNoteTempo,
			expanded: true,
			controlsSelector: '.fake-controls'
		}}
	/>
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
		<div class="decrease-tempo-container">
			<IconButton onClick={decreaseTempo}>
				<MinusIcon />
			</IconButton>
		</div>
		<div class="current-tempo-container">
			{halfNoteTempo}
		</div>
		<div class="increase-tempo-container">
			<IconButton onClick={increaseTempo}>
				<PlusIcon />
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
		position: sticky;
		bottom: calc(0 + env(safe-area-inset-bottom, 0));
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
	.edit-abc-container {
		grid-area: 1 / 1 / 1 / 1;
	}
	.rewind-container {
		grid-area: 1 / 3 / 1 / 3;
	}
	.play-pause-container {
		grid-area: 1 / 5 / 1 / 5;
	}
	.decrease-tempo-container {
		grid-area: 1 / 7 / 1 / 7;
	}
	.current-tempo-container {
		grid-area: 1 / 8 / 1 / 8;
	}
	.increase-tempo-container {
		grid-area: 1 / 9 / 1 / 9;
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
