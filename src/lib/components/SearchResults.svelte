<script>
  import SearchResult from '$lib/components/SearchResult.svelte';
  import scrollShadow from '$lib/util/scrollShadow';

  export let results;
</script>

<style>
  section {
    background-color: var(--light);
    display: grid;
    overflow-y: scroll;
    font-size: 1rem;
  }
  ul {
    list-style-type: none;
    height: 100%;
  }
</style>
<section class="search-results" use:scrollShadow>
  {#if results.tunes}
    <ul>
      {#each results.tunes as result (result.id)}
        <SearchResult {result} />
      {/each}
    </ul>
  {:else}
    <div>No results found</div>
  {/if}
</section>
