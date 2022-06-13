<script>
  import fsm from '$lib/util/fsm';
  import { selectedTuneVersions, selectedTuneVersion, selectedTune } from '$lib/util/stores';
  import scrollShadow from '$lib/util/scrollShadow';
</script>

<style>
  section {
    background-color: var(--light);
    overflow-y: scroll;
  }
  ul {
    font-size: 1.5em;
    list-style-type: none;
    height: 100%;
  }
  li {
    padding: 8px;
    display: grid;
  }
  li:not(:first-child) {
    border-top: 2px solid var(--dark);
    overflow-x: hidden;
    white-space: nowrap;
  }
  .selected {
    background-color: var(--darkest);
  }
  .selected button {
    color: var(--light);
  }
  .muted {
    font-size: 0.5em;
    color: var(--dark);
    padding-left: 5px;
  }
</style>

<section class="tune-versions" use:scrollShadow>
  <ul>
    {#each $selectedTuneVersions as tuneVersion, index (tuneVersion.id)}
      <li class:selected={$selectedTuneVersion?.id === tuneVersion.id}>
        <a href={`/${tuneVersion.id}`}>
          <!-- <button on:click={() => fsm.selectTuneVersion(tuneVersion, index + 1)}> -->
            <span>
              {`${index + 1}: ${tuneVersion.key.substring(0,4)}`}
            </span>
            <span class="muted">
              {`${tuneVersion.id}`}
            </span>
          <!-- </button> -->
        </a>
      </li>
    {/each}
  </ul>
</section>
