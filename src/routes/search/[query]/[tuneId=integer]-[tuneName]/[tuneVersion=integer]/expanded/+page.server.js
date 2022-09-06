// throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import { newGetAbc } from '$lib/util/theSession';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params}) {
// export async function get({ params }) {
  const { tuneId, tuneVersion } = params;
  const abc = await newGetAbc(tuneId, tuneVersion);

  return {
    abc,
    tuneId,
    tuneVersion
  };
}
