<script>
  import SearchIcon from '$lib/components/SearchIcon.svelte';
  import {
    goto,
  } from '$app/navigation';

  export let query = '';
  const handleSearch = () => {
    const queryUrl = encodeURIComponent(query).replaceAll('%20', '+');
    goto(`/search/${queryUrl}/`);
  }
</script>

<style>
  input {
    font-size: 1.5em;
    background-color: var(--light);
    padding: 0.25em;
    text-align: center;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 3em;
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
</style>

<section class="searcher">
  <form on:submit|preventDefault={handleSearch}>
    <input type="text" name="q" bind:value={query} />
    <button type="submit">
      <SearchIcon />
    </button>
  </form>
</section>
