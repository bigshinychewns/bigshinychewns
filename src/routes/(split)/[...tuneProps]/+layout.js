/** @type {import('./$types').LayoutLoad} */
export function load({ params }) {
	console.log('wtf is tuneprops??', params.tuneProps);
	const [tuneName, tuneVersion] = params.tuneProps.split('/');
	console.log('[tuneName, tuneVersion]', [tuneName, tuneVersion]);
	return {
		tuneName,
		tuneVersion
	}
}
