<script>
	export let onClick = () => {};
</script>

<section class="icon-button">
	<button on:click={onClick}>
		<slot />
	</button>
</section>

<style>
	section {
		display: grid;
	}
	button {
		display: grid;
		place-items: center;
	}
</style>
