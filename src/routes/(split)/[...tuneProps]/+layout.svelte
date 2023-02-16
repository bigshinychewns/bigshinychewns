<script>
	import SearchInput from '$lib/components/SearchInput.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import SelectedTuneBanner from '$lib/components/SelectedTuneBanner.svelte';
	import AbcPreview from '$lib/components/AbcPreview.svelte';
	import TuneVersions from '$lib/components/TuneVersions.svelte';
	import { searchResults, searchState, searchQuery } from '$lib/util/searchStore';
	import { getTuneStore } from '$lib/util/tunesStore';

	/** @type {import('./$types').LayoutData} */
	export let data;

	$: tuneStore = getTuneStore(data.tuneName);
</script>

<main class:selected={data.tuneName}>
	<section class="left">
			<section class="search">
				<SearchInput />
			</section>
			{#if data.tuneName}
				{#await tuneStore.load()}
					<section class="results">
						<Spinner />
					</section>
				{:then}
					<section class="selected-tune">
						<SelectedTuneBanner tune={$tuneStore[0]} />
					</section>
					<section class="results">
						<TuneVersions
							tuneVersions={$tuneStore}
							selectedVersion={data.tuneVersion}
						/>
					</section>
				{/await}
			{:else}
			<section class="results">
				{#if $searchState.isLoading && !$tuneStore}
					<Spinner />
				{/if}
				{#if $searchState.isLoaded && $searchQuery.length > 0}
					<SearchResults results={$searchResults} />
				{/if}
			</section>
			{/if}
	</section>
	{#if data.tuneVersion}
		{#await tuneStore.load()}
			<Spinner />
		{:then}
			<section class="right">
				<AbcPreview tune={$tuneStore.find(t => t.setting_id == data.tuneVersion)} />
			</section>
		{/await}
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
			max-height: calc(calc(100vh - 5em) / 2);
		}

		.left, .right {
			max-height: calc(100vh - 5em);
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
		max-height: calc(100vh - 5em);
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
		max-width: calc(calc(100vw - 5em) / 2);
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
