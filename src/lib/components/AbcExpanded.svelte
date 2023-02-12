<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import RewindIcon from '$lib/icons/RewindIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import DownArrowIcon from '$lib/icons/DownArrowIcon.svelte';
	import MinusIcon from '$lib/icons/MinusIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import abcjsCanvas from '$lib/util/abcjsCanvas';
	import LoopIcon from '$lib/icons/LoopIcon.svelte';
	import generateAbc from '$lib/util/generateAbc';
	import '$lib/styles/abcjs.css';

	export let tune;
	export let showEditor;

	$: abc = generateAbc(tune);

	let playing = false;
	let parsing = true;
	let looping = false;
	let playFunc = () => {};
	let pauseFunc = () => {};
	let rewindFunc = () => {};
	let toggleLoopFunc = () => {};

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
		looping = false;
	}

	const increaseTempo = async () => {
		halfNoteTempo = halfNoteTempo + 5;
		playing = false;
		looping = false;
	}

	const toggleLoop = async () => {
		toggleLoopFunc();
		looping = !looping;
	}

	const updateControls = ({
		play: newPlayFunc,
		pause: newPauseFunc,
		rewind: newRewindFunc,
		toggleLoop: newToggleLoop
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
		if (newToggleLoop) {
			toggleLoopFunc = newToggleLoop;
		}
		parsing = false;
	}
</script>

<main class="abc-expanded" class:hide={parsing}>
	<div
		id="renderArea"
		use:abcjsCanvas={{
			abc,
			updateControls,
			halfNoteTempo,
			expanded: true,
			controlsSelector: '.fake-controls'
		}}
	>
	</div>
	<div class="controls">
		<div class="fake-controls hide" />
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
		<div class="toggle-loop-container">
			<IconButton onClick={toggleLoop}>
				<LoopIcon --color={looping ? 'red' : null}/>
			</IconButton>
		</div>
		<div class="save-icon-container">
			<IconButton onClick={handleSave}>
				<DownArrowIcon />
			</IconButton>
		</div>
	</div>
</main>

<style>
	main {
		grid-area: main;
		display: grid;
		grid-template-rows: 1fr 4em;
		padding: 1em;
		background-color: var(--dark);
	}

	#renderArea {
		background-color: var(--darkest);
		color: var(--lightest);
		overflow-y: scroll;
		scrollbar-width: none;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hide {
		display: none;
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
