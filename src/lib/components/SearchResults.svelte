<script>
	import SearchResult from '$lib/components/SearchResult.svelte';
	import scrollShadow from '$lib/util/scrollShadow';

	export let results = [];
</script>

<section class="search-results" use:scrollShadow>
	{#if results.length}
		<ul>
			{#each results as result}
				<SearchResult {result} />
			{/each}
		</ul>
	{:else}
		<div>No results found</div>
	{/if}
</section>

<style>
	section {
		background-color: var(--light);
		display: grid;
		font-size: 1rem;
		max-height: calc(100vh - 10.5em);  /* 5em for logo + 6em for searchInput */
		overflow-y: scroll;
		scrollbar-width: none;
	}
</style>
