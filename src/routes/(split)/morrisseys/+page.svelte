<script>
	import AbcExpanded from '$lib/components/AbcExpanded.svelte';

	/** @type {import('./$types').PageData} */

	const tune = {
		name: "Morrissey's Favorite",
		type: 'reel',
		meter: '4/4',
		mode: 'GMaj',
		abc: `|:GFGA|GED|D2EGd|B2AG|
			A2AB|AGE|A2GAB|AGED|
			|GFGA|GED|D2EGd|B2AG|
			A2AB|AGE|D2EGA|1 G4:|2 G3F||
			|:GED|B2AG|g2fed|B2AG|
			A2AB|AGE|A2GAB|AGED|
			|1 GED|B2AG|g2fed|B2AG|
			A2AB|AGE|D2EGA| G3 F:|
			|2 GFGA|GED|D2EGd|B2AG|
			A2AB|AGE|D2EGA| G4||`.replaceAll('	', '')
	};

// const flowers = `|:A,2A,A,CEC | D2DEDC2 | G,2G,G,A,B,G, | C2CCDCB,2 :|`

// let showEditor = false;
</script>

<AbcExpanded tune={tune}/>

