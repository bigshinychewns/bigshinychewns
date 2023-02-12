<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { page } from '$app/stores';

	export let submitted = false;
</script>

<section class="search-input">
	<form method="GET" action="/" on:submit={() => submitted = true}>
		<input type="text" name="q" value={$page.url.searchParams.get('q')}/>
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
		height: 2.5em;
	}

	button {
		width: 3em;
		background-color: var(--light);
		display: grid;
		place-items: center;
		border-left: 0.5em solid var(--dark);
	}
</style>
