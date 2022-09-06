<script>
  import AbcExpanded from '$lib/components/AbcExpanded.svelte';
  import AbcEditor from '$lib/components/AbcEditor.svelte';

  export let abc = '';
  export let tuneId = '';
  export let tuneVersion = '';

  let showEditor = false;
</script>

{#if showEditor}
  <AbcEditor bind:abc={abc} bind:showEditor={showEditor} />
{:else}
  <AbcExpanded tuneAbc={abc} bind:showEditor={showEditor} />
{/if}
