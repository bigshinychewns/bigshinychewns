<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { searchQuery } from '$lib/util/searchStore';
	import IconButton from './IconButton.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
</script>

<section class="search-input">
	<form method="GET" action="/">
		<fieldset>
			<input type="text" name="q" bind:value={$searchQuery} />
			{#if $searchQuery.length}
				<div class="button-container">
					<IconButton onClick={() => $searchQuery = ''} --height={'2.5em'}>
						<CloseIcon --ggs={"0.5"} --color={"var(--dark)"}/>
					</IconButton>
				</div>
			{/if}
		</fieldset>
		<button type="submit">
			<SearchIcon />
		</button>
	</form>
</section>

<style>
	section {
		height: 2.5em;
	}

	fieldset {
		border: none;
		display: grid;
		grid-template-columns: 1fr 3em;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		width: 100%;
	}

	input {
		grid-area: 1 / 1 / 2 / 3;
		background-color: var(--light);
		text-align: center;
		height: 2.5em;
	}

	.button-container {
		grid-area: 1 / 2 / 2 / 3;
		justify-self: center;
		align-self: center;
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
