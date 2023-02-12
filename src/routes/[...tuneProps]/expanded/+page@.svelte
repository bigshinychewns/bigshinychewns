<script>
	import AbcExpanded from '$lib/components/AbcExpanded.svelte';
	import AbcEditor from '$lib/components/AbcEditor.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let showEditor = false;
</script>

{#if showEditor}
	<!-- <AbcEditor bind:abc bind:showEditor /> -->
{:else}
	<AbcExpanded bind:showEditor tune={data.tune}/>
{/if}
