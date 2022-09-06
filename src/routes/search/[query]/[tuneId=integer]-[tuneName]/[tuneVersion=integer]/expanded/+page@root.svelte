<script>
  // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import AbcExpanded from '$lib/components/AbcExpanded.svelte';
  import AbcEditor from '$lib/components/AbcEditor.svelte';

  export let data;
  let { abc, tuneId, tuneVersion } = data;
  $: ({ abc, tuneId, tuneVersion } = data);
  let showEditor = false;
</script>

{#if showEditor}
  <AbcEditor bind:abc={abc} bind:showEditor={showEditor} />
{:else}
  <AbcExpanded tuneAbc={abc} bind:showEditor={showEditor} />
{/if}
