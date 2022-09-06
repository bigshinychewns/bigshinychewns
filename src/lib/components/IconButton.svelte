<script>
  export let onClick = () => {};
</script>

<style>
  section {
    display: grid;
  }
  button {
    display: grid;
    place-items: center;
  }
</style>

<section class="icon-button">
  <button on:click={onClick}>
    <slot></slot>
  </button>
</section>
