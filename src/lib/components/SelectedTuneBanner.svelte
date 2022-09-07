<script>
	export let tune;
</script>

<section class="selected-tune-banner">
	<span>{tune.name}</span><span class="muted">{tune.type}</span>
</section>

<style>
	section {
		background-color: var(--light);
		font-size: 2rem;
		color: var(--darkest);
		width: 100%;
		user-select: none;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}

	.muted {
		font-size: 0.75em;
		color: var(--dark);
		padding-left: 0.5em;
	}
</style>
