<script>
  import scrollShadow from '$lib/util/scrollShadow';
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
    background-color: hsla(0, 100%, 100%, 0);
  }
</style>

<section class="list" use:scrollShadow>
  <ul >
    <slot></slot>
  </ul>
</section>
