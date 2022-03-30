<script>
  // import AbcInput from './AbcInput.svelte';
  import SearchResult from '$lib/components/SearchResult.svelte';
  import { searchSession, fetchSessionTune } from '$lib/util/theSession';
  import AllTuneVersions from './AllTuneVersions.svelte';
  import { createEventDispatcher } from 'svelte';
  let searchQuery = '';

  let searchPromise;
  let tunePromise;
  let fetchingTune = false;
  let searchingTunes = false;

  const dispatchEvent = createEventDispatcher();
  /** @param {Port} selectedPort */
  const portSelected = (selectedPort) => {
    dispatchEvent('portSelected', selectedPort.code)
  };


  const handleSearch = async (e) => {
    searchingTunes = true;
    searchPromise = searchSession(searchQuery);
  };

  const tuneSelectedHandler = (e) => {
    const url = e.detail.url;
    fetchingTune = true;
    tunePromise = fetchSessionTune(url);
  };
</script>

<form on:submit|preventDefault={handleSearch}>
  <input type="text" bind:value={searchQuery} />
  <button type="submit">Search</button>
</form>
{#if searchingTunes}
  {#await searchPromise}
    <div>spinning!</div>
  {:then searchResponse}
    <div>searchResponse recieved!</div>
    {#if searchResponse.tunes}
      <ul>
        {#each searchResponse.tunes as result (result.id)}
          <SearchResult {result} on:tuneSelected={tuneSelectedHandler}/>
        {/each}
      </ul>
    {:else}
      <div>No results found</div>
    {/if}
  {/await}
{/if}
{#if fetchingTune}
  {#await tunePromise}
    <div>spanning</div>
  {:then tuneResponse}
    <AllTuneVersions data={tuneResponse} />
  {/await}
{/if}
