<script>
	import IconButton from './IconButton.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import DownArrowIcon from '$lib/icons/DownArrowIcon.svelte';
	import { savedTunes } from '$lib/util/stores';

	export let abc;
	export let showEditor = false;
	// export let tuneId;
	// export let tuneVersion;

	const acceptHandler = () => {
		showEditor = false;
	};

	const formatHandler = () => {
		const whatever = {};
	};

	const cancelHandler = () => {
		showEditor = false;
	};

	const saveHandler = () => {
		savedTunes.add();
	};
</script>

<section class="abc-editor">
	<textarea bind:value={abc} />
	<div class="controls">
		<div class="save-format-button-container">
			<IconButton onClick={formatHandler}>
				<span>Format</span>
			</IconButton>
		</div>
		<div class="accept-button-container">
			<IconButton onClick={acceptHandler}>
				<CheckIcon />
			</IconButton>
		</div>
		<div class="cancel-button-container">
			<IconButton onClick={cancelHandler}>
				<CloseIcon />
			</IconButton>
		</div>
		<div class="save-button-container">
			<IconButton onClick={saveHandler}>
				<DownArrowIcon />
			</IconButton>
		</div>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-rows: 474px 60px;
		width: 100%;
	}
	.controls {
		background-color: var(--medium);
		display: grid;
		grid-template-columns: repeat(9, 50px);
		place-items: center;
	}
	.accept-button-container {
		grid-area: 1 / 3 / 1 / 3;
	}
	.cancel-button-container {
		grid-area: 1 / 6 / 1 / 6;
	}
	.save-button-container {
		grid-area: 1 / 9 / 1 / 9;
	}
	textarea {
		font-size: 2em;
		background-color: var(--light);
	}
</style>
