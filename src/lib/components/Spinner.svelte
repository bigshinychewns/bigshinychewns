<script>
	export let color = 'var(--dark)';
	export let backgroundColor = 'var(--light)';
	export let width = '100%';
	export let gridArea = '';
</script>

<section
	class="spinner"
	style:width
	style:background-color={backgroundColor}
	style:grid-area={gridArea}
	style:color
>
	<i class="gg-loadbar-alt" />
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr;
		place-items: center;
		height: 100%;
	}
	@keyframes loadbaralt {
		0%,
		to {
			left: 0;
			right: 80%;
		}
		25%,
		75% {
			left: 0;
			right: 0;
		}
		50% {
			left: 80%;
			right: 0;
		}
	}
	.gg-loadbar-alt,
	.gg-loadbar-alt::before,
	.gg-loadbar-alt::after {
		display: block;
		box-sizing: border-box;
		height: 4px;
		border-radius: 4px;
	}
	.gg-loadbar-alt {
		position: relative;
		transform: scale(var(--ggs, 1));
		width: 18px;
		--ggs: 10;
	}
	.gg-loadbar-alt::after,
	.gg-loadbar-alt::before {
		background: currentColor;
		content: '';
		position: absolute;
	}
	.gg-loadbar-alt::before {
		animation: loadbaralt 2s cubic-bezier(0, 0, 0.58, 1) infinite;
	}
	.gg-loadbar-alt::after {
		width: 18px;
		opacity: 0.3;
	}
</style>
