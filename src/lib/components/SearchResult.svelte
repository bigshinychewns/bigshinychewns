<script>
	import { page } from '$app/stores';
	import { encodeForUrl } from '$lib/util/urlParams';

	export let result = {};
	const { name, type, url, alias, id } = result;

	const nameUrl = encodeForUrl(name);
</script>

<li class="search-result">
	<a href={`${$page.url.pathname}/${id}-${nameUrl}`}>
		<span>
			{name}
		</span>
		<span class="muted">
			{type}
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

	.muted {
		font-size: 0.75em;
		color: var(--dark);
		padding-left: 0.25em;
	}

	a {
		text-decoration: none;
	}
</style>
