<script>
	import Menu from '$lib/components/Menu.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import ChevronLeftIcon from '$lib/icons/ChevronLeftIcon.svelte';
	import { networkIsActive } from '$lib/util/tunesStore';

	import '$lib/styles/css-reset.css';
	import '$lib/styles/fonts.css';
</script>

<section class="container">
	<header>
		<div class="back">
			<IconButton>
				<ChevronLeftIcon --color="var(--light)" />
			</IconButton>
		</div>
		<div class="logo">
			<a href="/">
				<h1 class:dazzling={$networkIsActive}>Big Shiny Chewns</h1>
			</a>
		</div>
		<div class="menu">
			<Menu />
		</div>
	</header>
	<slot/>
</section>

<style>
	:root {
		--darkest: hsl(0, 0%, 15%);
		--dark: hsl(0, 0%, 35%);
		--medium: hsl(0, 0%, 50%);
		--light: hsl(0, 0%, 65%);
		--lightest: hsl(0, 0%, 85%);
		--shadow-size: 1em;
		--shadow-blur-size: -0.75em;
		--shadow-color: hsla(0, 0%, 15%, 0.7);

		font-family: 'Copse';
	}

	:global(html) {
		height: -webkit-fill-available;
	}

	section {
		display: grid;
		grid-template-columns: 1em 1fr 1em;
		grid-template-rows: 4em 1fr 1em;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'. header .'
			'. main .'
			'. . .';
		min-height: inherit;
		max-height: 100vh;
		max-height: -webkit-fill-available;
	}

	header {
		display: grid;
		grid-template-columns: 4em 1fr 4em;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas: 'back logo menu';
		grid-area: header;
		place-items: center;
	}

	h1 {
		white-space: nowrap;
		grid-area: logo;
		text-align: center;
		font-family: 'Sherwood';
		font-size: 2em;
		color: var(--darkest);
		padding-bottom: 0.25em;
		-webkit-text-stroke: 0.02em var(--light);
		text-shadow:
			0.03125em 0.03125em 0 var(--darkest),
			0.0625em 0.0625em 0 var(--dark),
			0.09375em 0.09375em 0 var(--medium),
			0.125em 0.125em 0 var(--light),
			0.15625em 0.15625em 0 var(--lightest);
	}

	h1.dazzling {
		animation: dazzler 1s linear infinite, throbber 1s linear infinite;
	}

	@keyframes throbber {
		0% {
			color: var(--dark);
		}
		50% {
			color: var(--darkest);
		}
		100% {
			color: var(--dark);
		}
	}

	@keyframes dazzler {
		0% {
			text-shadow:
				0.03125em 0.03125em 0 var(--darkest),
				0.0625em 0.0625em 0 var(--dark),
				0.09375em 0.09375em 0 var(--medium),
				0.125em 0.125em 0 var(--light),
				0.15625em 0.15625em 0 var(--lightest);
		}
		20% {
			text-shadow:
				0.03125em 0.03125em 0 var(--lightest),
				0.0625em 0.0625em 0 var(--darkest),
				0.09375em 0.09375em 0 var(--dark),
				0.125em 0.125em 0 var(--medium),
				0.15625em 0.15625em 0 var(--light);
		}
		40% {
			text-shadow:
				0.03125em 0.03125em 0 var(--light),
				0.0625em 0.0625em 0 var(--lightest),
				0.09375em 0.09375em 0 var(--darkest),
				0.125em 0.125em 0 var(--dark),
				0.15625em 0.15625em 0 var(--medium);
		}
		60% {
			text-shadow:
				0.03125em 0.03125em 0 var(--medium),
				0.0625em 0.0625em 0 var(--light),
				0.09375em 0.09375em 0 var(--lightest),
				0.125em 0.125em 0 var(--darkest),
				0.15625em 0.15625em 0 var(--dark);
		}
		80% {
			text-shadow:
				0.03125em 0.03125em 0 var(--dark),
				0.0625em 0.0625em 0 var(--medium),
				0.09375em 0.09375em 0 var(--light),
				0.125em 0.125em 0 var(--lightest),
				0.15625em 0.15625em 0 var(--darkest);
		}
		100% {
			text-shadow:
				0.03125em 0.03125em 0 var(--darkest),
				0.0625em 0.0625em 0 var(--dark),
				0.09375em 0.09375em 0 var(--medium),
				0.125em 0.125em 0 var(--light),
				0.15625em 0.15625em 0 var(--lightest);
		}
	}

	.back {
		grid-area: back;
	}

	.menu {
		grid-area: menu;
	}

	a {
		color: var(--darkest);
		text-decoration: none;
		display: flex;
	}

	:global(body > div.root) {
		display: flex;
		min-width: 100vw;
		min-height: 100vh;
		min-height: -webkit-fill-available;
	}

	:global(body) {
		background-color: var(--darkest);
	}


	@media screen and (max-width: 475px) {
		:global(body) {
			font-size: 11px;
		}
	}

	@media screen and (min-width: 475px) and (max-width: 550px) {
		:global(body) {
			font-size: 13px;
		}
	}

	@media screen and (min-width: 900px) {
		:global(body) {
			font-size: 20px;
		}
	}

	@media screen and (min-width: 550px) and (max-width: 900px) {
		:global(body) {
			font-size: 15px;
		}
	}

	:global(body) {
		height: 100svh;
	}
</style>
