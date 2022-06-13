<script>
  import scrollShadow from '$lib/util/scrollShadow';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let data = {};

  const tuneVersions = data.settings;
  let _empty, _search, query, tune, tuneId, hrefBase;
  $: [_empty, _search, query, tune, tuneId] = $page.url.pathname.split('/');
  $: hrefBase = `/search/${query}/${tune}`;

  let ul;
  onMount(() => {
    const selectedVersion = ul.querySelector('.selected');
    if (selectedVersion) {
      const scrollDistance =  selectedVersion.offsetTop;
      ul.scrollTo({
        top: scrollDistance,
        left: 0,
        behavior: 'smooth'
      });
    }
  });

</script>

<style>
  section {
    background-color: var(--light);
    display: grid;
    font-size: 1rem;
    max-height: 100%;
    overflow-y: scroll;
  }

  ul {
    list-style-type: none;
    overflow-y: scroll;
  }

  li {
    padding: 0.5em;
    display: grid;
    font-size: 1.25rem;
  }

  li:not(:first-child) {
    border-top: 0.1em solid var(--dark);
    overflow-x: hidden;
    white-space: nowrap;
  }

  a {
    color: var(--darkest);
    text-decoration: none;
  }

  .muted {
    font-size: 0.75em;
    color: var(--dark);
    padding-left: 0.5em;
  }

  .selected {
    background-color: var(--darkest);
  }

  .selected a {
    color: var(--light);
  }
</style>

<section class="tune-versions">
  <ul use:scrollShadow bind:this={ul}>
    {#each tuneVersions as tuneVersion, index (tuneVersion.id)}
      <li class:selected={tuneId == index + 1}>
        <a href={`${hrefBase}/${index + 1}`}>
          <span>
            {`${index + 1}: ${tuneVersion.key}`}
          </span>
          <span class="muted">
            {tuneVersion.id}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</section>
