<script>
  // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import AbcPreview from '$lib/components/AbcPreview.svelte';
  import TuneVersion from '$lib/components/TuneVersion.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import SearchResult from '$lib/components/SearchResult.svelte';
  import SelectedTuneBanner from '$lib/components/SelectedTuneBanner.svelte';
  import List from '$lib/components/List.svelte';
  import { tuneVersionIndex } from '$lib/util/stores';
  import AbcEditor from '$lib/components/AbcEditor.svelte';
  import AbcExpanded from '$lib/components/AbcExpanded.svelte';
  // import scrollShadow from '$lib/util/scrollShadow';

  /** @type {import('./$types').PageData} */
  export let data;
  let {tune, abc, query, searchResults} = data; //, tuneId, tuneVersion;
  $: ({tune, abc, query, searchResults} = data);
</script>

<style>
  .left {
    display: flex;
    /* grid-auto-flow: row;
    grid-row-gap: 1em;
    grid-template-rows: 2.5em 4em auto; */
    flex-direction: column;
    gap: 0.5em;
    overflow-y: hidden;
  }

  /* .left.tune-selected {
    grid-auto-rows: unset;
    grid-template-rows: 2.5em auto;
  } */

  section {
    max-height: calc(100vh - 7em);
    max-width: calc(100vw - 4em);
  }

  /* .search-results-container {
    display: grid;
    overflow-y: scroll;
  } */
</style>

<section class="left" class:tune-selected={query && !tune}>
  {#if query}
    <SearchInput query={query} />
  {/if}
  {#if query && !tune}
    {#if searchResults.tunes.length}
      <List>
        {#each searchResults.tunes as result (result.id)}
          <SearchResult {result} />
        {/each}
      </List>
    {:else}
      <h3>No results found</h3>
    {/if}
  {/if}
  {#if tune}
    <SelectedTuneBanner tune={tune} />
    <List>
      {#each tune.settings as tuneVersion, index (tuneVersion.id)}
        <TuneVersion {tuneVersion} {index}/>
      {/each}
    </List>
  {/if}
</section>
{#if abc}
  <section class="right">
    {#key abc}
      <AbcPreview abc={abc} />
    {/key}
  </section>
{/if}
