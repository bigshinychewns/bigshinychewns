<script>
  import fsm from '$lib/util/fsm';

  const handleClick = () => {
    fsm.edit();
  }
</script>

<style>
  section {
    display: grid;
  }
  button {
    display: grid;
    place-items: center;
    color: var(--darkest);
    font-variant: small-caps;
    text-underline-offset: 0.2em;
    text-decoration: underline;
    font-weight: bold;
    font-size: 1.3em;
  }
</style>

<section class="play-pause-button">
  <button on:click={handleClick}>
    Abc
  </button>
</section>
