<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let tuneVersion = {};
  export let index;

  let _empty, _search, query, tune, tuneId, hrefBase;
  $: [_empty, _search, query, tune, tuneId] = $page.url.pathname.split('/');
  $: hrefBase = `/search/${query}/${tune}`;

  $: selected = tuneId == index + 1;
  let element;

  const scrollIntoView = () => {
    element.scrollIntoView({ behavior: "smooth" });
  }

  onMount(() => {
    if (selected) {
      scrollIntoView();
    }
  });

</script>

<style>
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

<li bind:this={element} class:selected class="tune-version">
  <a href={`${hrefBase}/${index + 1}`}>
    <span>
      {`${index + 1}: ${tuneVersion.key}`}
    </span>
    <span class="muted">
      {tuneVersion.id}
    </span>
  </a>
</li>
