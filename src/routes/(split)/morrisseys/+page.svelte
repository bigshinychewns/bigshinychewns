<script>
	import AbcExpanded from '$lib/components/AbcExpanded.svelte';

	/** @type {import('./$types').PageData} */

const tune = {
  name: "Morrissey's Favorite",
  type: 'reel',
  meter: '4/4',
  mode: 'GMaj',
  abc: `|:GFGA GED D2 EGD B2 AG|
A2 AB AGE A2 GAB AGED:|
GFGA GED D2EGd B2 AG
A2 AB AGE D2EGA G2F
|:G2ED B2AG g2fed B2AG
GED B2AG gfed B2AG
A2AB AGE D2EGA G2G:|`
}

	let showEditor = false;
</script>

<AbcExpanded bind:showEditor tune={tune}/>
