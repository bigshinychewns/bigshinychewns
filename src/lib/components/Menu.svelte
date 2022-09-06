<script>
  import MenuIcon from '$lib/icons/MenuIcon.svelte';
  import IconButton from './IconButton.svelte';
  import { fly } from 'svelte/transition';

  let open = false;

  const handleClick = () => open = !open;
</script>

<style>
  section {
    height: 100%;
    width: 100%;
  }
  ul {
    position: fixed;
    top: 2.75em;
    width: 14em;
    background-color: var(--light);
    font-size: 1.5em;
    right: 0;
    list-style-type: none;
    z-index: 1;
    padding: 1em;
    white-space: nowrap;
    border-radius: 0 0 0 0.5em;
  }
  a {
    text-decoration:none;
    color: var(--darkest);
  }
  li {
    padding-bottom: 1em;
  }
  li:last-of-type {
    padding-bottom: 0;
  }
  div {
    height: 100%;
    display: grid;
    place-items: center;
    border-radius: 0.5em 0.5em 0 0;
  }
  div.open {
    background-color: var(--light);
  }
</style>

<section class="menu">
  <div class:open>
    <IconButton onClick={handleClick}>
      <MenuIcon --color={!open ? 'var(--light)' : null} />
    </IconButton>
  </div>
  {#if open}
    <ul transition:fly={{duration: 150, x: 500}}>
      <li><a href="/shelackybookies">Shelackybookies Chewns</a></li>
      <li>Saved Chewns</li>
    </ul>
  {/if}
</section>
