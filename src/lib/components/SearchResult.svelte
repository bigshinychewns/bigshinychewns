<script>
	import { encodeForUrl } from '$lib/util/urlParams';

	export let result = {target: ''};
	$: nameUrl = encodeForUrl(result.target);
</script>

<li class="search-result">
	<a href={`/${nameUrl}`}>
		<span>
			{result.target}
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

	span {
		color: var(--darkest);
	}

	a {
		text-decoration: none;
	}
</style>
