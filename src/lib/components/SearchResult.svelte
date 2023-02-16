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
		display: flex;
		font-size: 1.25rem;
	}

	li:not(:first-child) {
		border-top: 0.1em solid var(--dark);
	}

	span {
		color: var(--darkest);
		overflow-x: hidden;
		white-space: nowrap;
	}

	a {
		text-decoration: none;
	}
</style>
