<script>
  import AcceptButton from './AcceptButton.svelte';
  import CancelButton from './CancelButton.svelte';
  import { tuneAbc } from '$lib/util/stores';
  import fsm from '$lib/util/fsm';

  let editorValue = $tuneAbc;

  const acceptHandler = () => {
    fsm.save(editorValue);
  };
</script>

<style>
  section {
    display: grid;
    grid-template-rows: 474px 60px;
    width: 100%;
  }
  .controls {
    background-color: var(--medium);
    display: grid;
    grid-template-columns: repeat(9, 50px);
    place-items: center;
  }
  .accept-button-container {
    grid-area:1 / 3 / 1 / 3;
  }
  .cancel-button-container {
    grid-area:1 / 6 / 1 / 6;
  }
  textarea {
    background-color: var(--light);
  }
</style>

<section class="abc-editor">
  <textarea bind:value={editorValue} />
  <div class="controls">
    <div class="accept-button-container">
      <AcceptButton onClick={acceptHandler} />
    </div>
    <div class="cancel-button-container">
      <CancelButton />
    </div>
  </div>
</section>
