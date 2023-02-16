/** @type {import('./$types').LayoutLoad} */
export function load({ params }) {
	const [tuneName, tuneVersion] = params.tuneProps.split('/');
	return {
		tuneName,
		tuneVersion
	}
}
