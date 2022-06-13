<script>
  import AbcPreview from '$lib/components/AbcPreview.svelte';
  import AllTuneVersions from '$lib/components/AllTuneVersions.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import SearchResults from '$lib/components/SearchResults.svelte';
  import SelectedTuneBanner from '$lib/components/SelectedTuneBanner.svelte';
  import scrollShadow from '$lib/util/scrollShadow';

  export let tune, abc, query, tuneId, tuneVersion, searchResults;
</script>

<style>
  .left {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 1em;
    grid-template-rows: 2.5em 4em auto;
  }

  .left.tune-selected {
    grid-auto-rows: unset;
    grid-template-rows: 2.5em auto;
  }

  section {
    max-height: calc(100vh - 7em);
    max-width: calc(100vw - 4em);
  }

  .search-results-container {
    overflow-y: scroll;
    display: grid;
  }
</style>

<section class="left" class:tune-selected={query && !tune}>
  {#if query}
    <SearchInput query={query} />
  {/if}
  {#if query && !tune}
    <div class="search-results-container" use:scrollShadow>
      <SearchResults results={searchResults} />
    </div>
  {/if}
  {#if tune}
    <SelectedTuneBanner tune={tune} />
    <AllTuneVersions data={tune} />
  {/if}
</section>
{#if abc}
  <section class="right">
    {#key abc}
      <AbcPreview abc={abc} />
    {/key}
  </section>
{/if}
