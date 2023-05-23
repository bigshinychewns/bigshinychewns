<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import RewindIcon from '$lib/icons/RewindIcon.svelte';
	import PauseIcon from '$lib/icons/PauseIcon.svelte';
	import PlayIcon from '$lib/icons/PlayIcon.svelte';
	import MinusIcon from '$lib/icons/MinusIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import abcjsCanvas from '$lib/util/abcjsCanvas';
	import generateAbc from '$lib/util/generateAbc';
	import '$lib/styles/abcjs.css';

	export let tune;
	// export let showEditor;

	$: abc = generateAbc(tune);

	let qpm = 100;

	let abcFsm;

	const handleEdit = () => {
		// showEditor = !showEditor;
	};

	const handleRewind = () => $abcFsm.send('rewind');
	const handlePause = () => $abcFsm.send('pause');
	const handlePlay = () =>
		$abcFsm.machine.current === 'audioUnactivated'
			? $abcFsm.send('play')
			: $abcFsm.send('play');

	const decreaseTempo = async () => {
		qpm = qpm - 5;
	};

	const increaseTempo = async () => {
		qpm = qpm + 5;
	};

	const updateFsm = (newFsm) => abcFsm = newFsm;

	$: canvasParams = {
			abc,
			updateFsm,
			qpm,
			expanded: true,
			controlsSelector: '.fake-controls'
		};
</script>

<main class="abc-expanded" class:hide={!abcFsm}>
	<div
		id="renderArea"
		use:abcjsCanvas={canvasParams}
	>
	</div>
	<div class="controls">
		<div class="fake-controls hide" />
		{#if !!abcFsm}
			<div>{$abcFsm.machine.current}</div>
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
				{#if $abcFsm?.machine?.current === 'audioPlaying'}
					<IconButton onClick={handlePause}>
						<PauseIcon />
					</IconButton>
				{:else}
					<IconButton onClick={handlePlay}>
						<PlayIcon />
					</IconButton>
				{/if}
			</div>
			<div class="decrease-tempo-container">
				<IconButton onClick={decreaseTempo}>
					<MinusIcon />
				</IconButton>
			</div>
			<div class="current-tempo-container">
				{qpm}
			</div>
			<div class="increase-tempo-container">
				<IconButton onClick={increaseTempo}>
					<PlusIcon />
				</IconButton>
			</div>
			<!-- <div class="toggle-loop-container">
				<IconButton onClick={toggleLoop}>
					<LoopIcon --color={looping ? 'red' : null}/>
				</IconButton>
			</div>
			<div class="save-icon-container">
				<IconButton onClick={handleSave}>
					<DownArrowIcon />
				</IconButton>
			</div> -->
		{/if}
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
		scroll-behavior: smooth;
	}

	#renderArea :global(.highlight) {
		--highlight-color: red;
		color: var(--highlight-color);
		filter: drop-shadow(0px 0px 3px var(--highlight-color));
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
