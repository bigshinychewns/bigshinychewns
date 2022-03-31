<script>
  import fsm from '$lib/util/fsm';
  import Searcher from '$lib/components/Searcher.svelte';
  import AbcPreview from '$lib/components/AbcPreview.svelte';
  import Spinner from './Spinner.svelte';
  import AbcExpanded from './AbcExpanded.svelte';
  import AbcEditor from './AbcEditor.svelte';

  const nonSearchingStates = ['parseAbcForExpanded', 'expandedTune'];
  const previewSpinnerStates = ['awaitTuneAbc', 'parseAbcForPreview'];
  const previewStates = ['previewTune', 'parseAbcForPreview'];
  const expandedStates = ['parseAbcForExpanded', 'expandedTune', 'abcEditor'];
  const abcExpandedStates = ['parseAbcForExpanded', 'expandedTune'];
</script>

<style>
  section {
    background-color: var(--dark);
    padding: 30px;
    display: grid;
  }
  .right {
    grid-template-columns: 1fr;
  }
  .left, .right {
    width: 50%;
  }
  .full {
    width: 100%;
    display: grid;
  }
  .expanded-container {
    display:grid;
    place-items: center;
    background-color: var(--darkest);
  }
</style>

{#if !expandedStates.includes($fsm)}
  <section class="left">
    {#if !nonSearchingStates.includes($fsm)}
      <Searcher />
    {/if}
  </section>
  <section class="right">
    <div>
      {#if previewSpinnerStates.includes($fsm)}
        <Spinner backgroundColor='var(--darkest)' color='var(--light)'/>
      {/if}
      {#if previewStates.includes($fsm)}
        <AbcPreview />
      {/if}
    </div>
  </section>
{:else}
  <section class="full">
    <div class="expanded-container">
      {#if abcExpandedStates.includes($fsm)}
        {#if $fsm === 'parseAbcForExpanded'}
          <Spinner
            backgroundColor='var(--darkest)'
            color='var(--light)'
            width='594px'
          />
        {/if}
        <AbcExpanded />
      {:else}
        <AbcEditor />
      {/if}
    </div>
  </section>
{/if}
