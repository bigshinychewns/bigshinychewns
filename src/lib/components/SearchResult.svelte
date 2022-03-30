<script>
  import fsm from '$lib/util/fsm';
  export let result = {};
  const {
    name,
    type,
    url,
    alias,
    id
  } = result;
  const clickHandler = () => fsm.selectTune(result);
</script>

<style>
  li {
    padding: 8px;
    display: grid;
  }
  li:not(:first-child) {
    border-top: 2px solid var(--dark);
    overflow-x: hidden;
    white-space: nowrap;
  }
  .muted {
    font-size: 0.75em;
    color: var(--dark);
    padding-left: 5px;
  }
</style>

<li class="search-result">
  <button on:click={clickHandler}>
    <span>
      {name}
    </span>
    <span class="muted">
      {type}
    </span>
  </button>
</li>
