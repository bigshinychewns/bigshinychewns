<script>
  import { onMount } from 'svelte';
  import { encodeForUrl } from '$lib/util/urlParams';

  export let tune;
  export let basePath;
  export let selected;
  let element;

  const encodedTuneTitle = encodeForUrl(tune.title);

  const scrollIntoView = () => {
    element.scrollIntoView({ behavior: "smooth" });
  };

  onMount(() => {
    if (selected == encodedTuneTitle) {
      scrollIntoView();
    }
  });
</script>

<style>
  li {
    font-size: 1.25rem;
    padding: 0.5em;
  }

  .muted {
    font-size: 0.75em;
    color: var(--dark);
    padding-left: 0.25em;
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

  .selected {
    background-color: var(--darkest);
  }

  .selected a {
    color: var(--light);
  }
</style>

<li
  class="saved-tune"
  bind:this={element}
  class:selected={selected == encodedTuneTitle}
>
  <a href={`${basePath}/${encodedTuneTitle}`}>
    <span class="muted">
      {tune.id}
    </span>
    <span>
      {tune.title}
    </span>
  </a>
</li>
