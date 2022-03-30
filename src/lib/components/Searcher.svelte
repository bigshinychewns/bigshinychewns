<script>
  import fsm from '$lib/util/fsm';
  import SearchResults from '$lib/components/SearchResults.svelte';
  import TuneVersions from '$lib/components/TuneVersions.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  // import { createEventDispatcher } from 'svelte';
  // const dispatchEvent = createEventDispatcher();

  const displayTuneVersionsStates = [
    'awaitTuneVersions',
    'displayTuneVersions',
    'awaitTuneAbc',
    'parseAbcForPreview',
    'previewTune'
  ];

  let searchQuery = '';
  const handleSearch = () => fsm.search(searchQuery);
</script>

<style>
  section {
    display: grid;
    grid-template-rows: 60px 444px;
    row-gap: 30px;
  }
  input {
    background-color: var(--light);
    font-size: 2em;
    padding: 10px;
  }
  form {
    display: grid;
    grid-template-columns: 390px 60px;
  }
  button {
    background-color: var(--light);
    display: grid;
    place-items: center;
    border-left: 5px solid var(--dark);
  }
  .search-results-container {
    display: grid;
  }
  .gg-search {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-radius: 100%;
    margin-left: -4px;
    margin-top: -4px;
    --ggs: 2;
    color: var(--darkest);
  }
  .gg-search::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    height: 8px;
    background: currentColor;
    transform: rotate(-45deg);
    top: 10px;
    left: 12px
  }
</style>

<section class="searcher">
  <form on:submit|preventDefault={handleSearch}>
    <input type="text" bind:value={searchQuery} />
    <button type="submit"><i class="gg-search" /></button>
  </form>
  <div class="search-results-container">
    {#if ['awaitTuneVersions', 'awaitSearchResults'].includes($fsm)}
      <Spinner />
    {:else if displayTuneVersionsStates.includes($fsm)}
      <TuneVersions />
    {:else if $fsm === 'displaySearchResults'}
      <SearchResults />
    {/if}
  </div>
</section>
