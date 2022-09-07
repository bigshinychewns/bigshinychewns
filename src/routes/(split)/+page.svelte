<script>
	import SearchInput from '$lib/components/SearchInput.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let loading = false;
	let loadingPromise;
</script>

<section>
	<SearchInput />
	<div class="search-results-container">
		{#if loading}
			{#await loadingPromise}
				<Spinner />
			{/await}
		{/if}
	</div>
</section>
