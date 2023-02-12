<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let tuneVersion = {};
	export let index;

	$: [_, tuneName, versionId] = $page.url.pathname.split('/');
	$: selected = versionId === tuneVersion.setting_id;
	let element;

	const scrollIntoView = () => {
		element.scrollIntoView({ behavior: 'smooth' });
	};

	onMount(() => {
		if (selected) {
			scrollIntoView();
		}
	});
</script>

<li bind:this={element} class:selected class="tune-version">
	<a href={`/${tuneName}/${tuneVersion.setting_id}`}>
		<span>
			{`${index + 1}: ${tuneVersion.mode}`}
		</span>
		<span class="muted">
			{tuneVersion.setting_id}
		</span>
	</a>
</li>

<style>
	li {
		padding: 0.5em;
		display: grid;
		font-size: 1.25rem;
	}

	li:not(:first-child) {
		border-top: 0.1em solid var(--dark);
		overflow-x: hidden;
		white-space: nowrap;
	}

	a {
		color: var(--darkest);
		text-decoration: none;
	}

	.muted {
		font-size: 0.75em;
		color: var(--dark);
		padding-left: 0.5em;
	}

	.selected {
		background-color: var(--darkest);
	}

	.selected a {
		color: var(--light);
	}
</style>
