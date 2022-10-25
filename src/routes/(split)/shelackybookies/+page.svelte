<script>
	import abcjs from 'abcjs';
	import List from '$lib/components/List.svelte';
	import SavedTune from '$lib/components/SavedTune.svelte';
	import removeLeadingThe from '$lib/util/removeLeadingThe';
	import chewnsBookString from '$lib/shelackybookies';
	import keyFromAbc from '$lib/util/keyFromAbc';

	const chewns = new abcjs.TuneBook(chewnsBookString.tunes);

	const sorters = {
		alphabetical: (a, b) =>
			removeLeadingThe(a.title).localeCompare(removeLeadingThe(b.title)),
		key: (a, b) => keyFromAbc(a.abc) < keyFromAbc(b.abc),
		sets: (a, b) => {}
	};

	const sortedChewns = chewns.tunes //.sort();
</script>

<List>
	{#each sortedChewns as chewn (chewn.title)}
		<SavedTune tune={chewn} basePath={'/shelackybookies'}/>
	{/each}
</List>
