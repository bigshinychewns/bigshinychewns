<script>
  import SearchResult from '$lib/components/SearchResult.svelte';
  import { searchResults } from '$lib/util/stores';
  import scrollShadow from '$lib/util/scrollShadow';
</script>

<style>
  section {
    background-color: var(--light);
    display: grid;
    overflow-y: scroll;
  }
  ul {
    font-size: 1.5em;
    list-style-type: none;
    height: 100%;
  }
</style>
<section class="search-results" use:scrollShadow>
  {#if $searchResults.tunes}
    <ul>
      {#each $searchResults.tunes as result (result.id)}
        <SearchResult {result} />
      {/each}
    </ul>
  {:else}
    <div>No results found</div>
  {/if}
</section>
