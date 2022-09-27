<script>
	import { goto } from '$app/navigation';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { encodeForQuery } from '$lib/util/urlParams';

	export let query = '';
	const handleSearch = () => {
		const queryUrl = encodeForQuery(query);
		goto(`/search/${queryUrl}/`);
	};
</script>

<section class="search-input">
	<form on:submit|preventDefault={handleSearch}>
		<input type="text" name="q" bind:value={query} />
		<button type="submit">
			<SearchIcon />
		</button>
	</form>
</section>

<style>
	section {
		height: 2.5em;
	}

	input {
		background-color: var(--light);
		text-align: center;
		font-size: 1.5em;
		width: calc(100% - 1.5em);
	}

	form {
		display: flex;
		grid-template-columns: 1fr 3em;
	}

	button {
		width: 3em;
		background-color: var(--light);
		display: grid;
		place-items: center;
		border-left: 0.5em solid var(--dark);
	}
</style>
