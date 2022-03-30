<script>
  import AbcInput from "./AbcInput.svelte";
  import { netRequest } from "$lib/util/theSession";
  export let data = {};
  const tuneVersions = data.settings;
  const tuneUrl = data.url;
  let fetchingAbc = false;
  let fetchPromise;
  const selectVersionHandler = (tuneVersionIndex) => {
    fetchingAbc = true;
    fetchPromise = netRequest(
      'GET',
      `/api/abc?url=${tuneUrl}&index=${tuneVersionIndex}`
    ).then(response => response.text());
  }
</script>
<style>
  button {
    width: 100%;
    height: 100%;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    height: 50px;
  }
</style>

<ul>
  {#each tuneVersions as tuneVersion, index (tuneVersion.id)}
    <li>
      <button on:click={() => selectVersionHandler(index + 1)}>
        {`${index + 1}: ${tuneVersion.id} - ${tuneVersion.key}`}
      </button>
    </li>
  {/each}
</ul>

{#if fetchingAbc}
  {#await fetchPromise}
    <div>spinning!!!!</div>
  {:then fetchedAbc}
    <AbcInput abcInput={fetchedAbc} />
  {/await}
{/if}
