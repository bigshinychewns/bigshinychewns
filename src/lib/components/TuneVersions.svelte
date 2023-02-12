<script>
	import scrollShadow from '$lib/util/scrollShadow';
	import TuneVersion from './TuneVersion.svelte';

	/** @type {Session.Tune[]}*/
	export let tuneVersions = [];
	export let selectedVersion;
</script>

<section class="tune-versions" class:half={selectedVersion} use:scrollShadow>
	<ul>
		{#each tuneVersions as tuneVersion, index (tuneVersion.setting_id)}
			<TuneVersion { index } { tuneVersion } />
		{/each}
	</ul>
</section>

<style>
	section {
		background-color: var(--light);
		overflow-y: scroll;
		scrollbar-width: none;
		max-height: calc(var(--app-height) - 14em);
	}

	@media screen and (max-width: 700px) {
		section.half {
			max-height: calc(calc(calc(var(--app-height) - 5em) / 2) - 8em);
		}
	}

	ul {
		font-size: 1.5em;
		list-style-type: none;
		height: 100%;
	}
</style>
