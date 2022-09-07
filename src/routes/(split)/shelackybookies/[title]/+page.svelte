<script>
	import abcjs from 'abcjs';
	import List from '$lib/components/List.svelte';
	import SavedTune from '$lib/components/SavedTune.svelte';
	import AbcPreview from '$lib/components/AbcPreview.svelte';
	import { page } from '$app/stores';
	import chewnsBookString from '$lib/shelackybookies';
	import { decodeFromUrl } from '$lib/util/urlParams';

	const chewnsBook = new abcjs.TuneBook(chewnsBookString.tunes);
	const removeStartingThe = (string) =>
		string.indexOf('The ') === 0 || string.indexOf('the ') === 0 ? string.slice(4) : string;

	const sortedChewns = chewnsBook.tunes.sort((a, b) =>
		removeStartingThe(a.title).localeCompare(removeStartingThe(b.title))
	);

	let title, chewnObject;
	$: {
		title = decodeFromUrl($page.params.title);
		chewnObject = chewnsBook.getTuneByTitle(title);
	}
</script>

<List>
	{#each sortedChewns as chewn (chewn.title)}
		<SavedTune tune={chewn} basePath={'/shelackybookies'} selected={$page.params.title} />
	{/each}
</List>

{#if $page.params.title}
	<section class="right">
		{#key chewnObject}
			<AbcPreview abc={chewnObject.abc} />
		{/key}
	</section>
{/if}
