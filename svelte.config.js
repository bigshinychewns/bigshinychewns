// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-vercel';

// --=== VERCEL CONFIG ===--
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
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
