<script>
	import SearchInput from '$lib/components/SearchInput.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import SelectedTuneBanner from '$lib/components/SelectedTuneBanner.svelte';
	import AbcPreview from '$lib/components/AbcPreview.svelte';
	import TuneVersions from '$lib/components/TuneVersions.svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;

	let submitted = false;
</script>

<main class:selected={data.tuneVersions?.length}>
	<section class="left">
		<section class="search">
			<SearchInput bind:submitted />
		</section>
		{#if data.tuneVersions?.length}
			<section class="selected-tune">
				<SelectedTuneBanner tune={data.tuneVersions[0]} />
			</section>
			<section class="results">
				<TuneVersions
					tuneVersions={data.tuneVersions}
					selectedVersion={data.selectedVersion}
				/>
			</section>
		{:else}
		<section class="results">
			{#if submitted && !data.searchResults && !data.tuneVersions}
				<Spinner />
			{/if}
			{#if data.searchResults}
				<SearchResults results={data.searchResults} />
			{/if}
		</section>
		{/if}
	</section>
	{#if data.selectedVersion}
		<section class="right">
			<AbcPreview tune={data.selectedVersion} />
		</section>
	{/if}
</main>

<style>
	@media screen and (max-width: 700px) {
		main {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'left'
				'right';
			gap: 1em 0px;
		}

		main.selected .left, main.selected .right {
			max-height: calc(calc(var(--app-height) - 5em) / 2);
		}

		.left, .right {
			max-height: calc(var(--app-height) - 5em);
		}
	}

	@media screen and (min-width: 700px) {
		main {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			grid-template-areas: 'left right';
			gap: 0em 1em;
		}
	}

	main {
		display: grid;
		grid-auto-flow: row;
		grid-area: main;
		background-color: var(--dark);
		max-height: calc(var(--app-height) - 5em);
		padding: 1em;
	}

	main.selected .left {
		grid-template-rows: 2.5em 2.5em 1fr;
		grid-template-areas:
			'search'
			'selected'
			'results';
	}

	.left {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2.5em 1fr;
		gap: 1em 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'search'
			'results';
		grid-area: left;
	}

	.search {
		grid-area: search;
	}

	.selected-tune {
		grid-area: selected;
	}

	.results {
		grid-area: results;
	}

	.right {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 4em;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'preview'
			'controls';
		grid-area: right;
	}
</style>
