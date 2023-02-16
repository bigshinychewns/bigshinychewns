<script>
	import CloseIcon from "$lib/icons/CloseIcon.svelte";
	export let tune;
</script>

<section class="selected-tune-banner">
	<span>{tune.name}</span>
	<span class="muted">{tune.type}</span>
	<a href="/" class="muted">
		<CloseIcon --color={"var(--dark)"} --ggs={"0.6"}/>
	</a>
</section>

<style>
	section {
		background-color: var(--light);
		font-size: 1.5rem;
		color: var(--darkest);
		width: 100%;
		user-select: none;
		height: 100%;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;

	}

	span {
		overflow-x: hidden;
		white-space: nowrap;
	}

	.muted {
		font-size: 0.75em;
		color: var(--dark);
		padding-left: 0.5em;
	}

	a {
		display: contents;
		text-decoration: none;
	}
</style>
