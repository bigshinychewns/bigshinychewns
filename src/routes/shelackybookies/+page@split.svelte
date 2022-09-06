<script>
  import abcjs from 'abcjs';
  import List from "$lib/components/List.svelte";
  import SavedTune from '$lib/components/SavedTune.svelte';

  import chewnsBookString from '$lib/shelackybookies'

  const chewns = new abcjs.TuneBook(chewnsBookString.tunes);
  const removeStartingThe = (string) =>
    (string.indexOf('The ') === 0 || string.indexOf('the ') === 0)
      ? string.slice(4)
      : string;

  const sortedChewns = chewns.tunes.sort(
    (a, b) =>
      removeStartingThe(a.title).localeCompare(removeStartingThe(b.title))
  );
  console.log('chewns.tunes', chewns.tunes);
</script>

<List>
  {#each sortedChewns as chewn, index (chewn.title)}
    <SavedTune tune={chewn} basePath={'/shelackybookies'}/>
  {/each}
</List>
