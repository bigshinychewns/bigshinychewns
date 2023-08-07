
// --=== VERCEL CONFIG ===--
// import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: preprocess(),

// 	kit: {
// 		adapter: adapter()
// 	}
// };

// export default config;

// --=== RENDER CONFIG ===--
// import node from '@sveltejs/adapter-node';


// Netlify config
import netlify_adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: netlify_adapter({
			edge: false,
			// split: true
		})
	}
};

export default config;
