// throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import { searchSession } from '$lib/util/theSession';
import { newGetAbc, fetchTuneById } from '$lib/util/theSession';
import { decodeFromQuery } from '$lib/util/urlParams';

export const prerender = 'auto';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let
    query,
    searchResults,
    tune,
    abc,
    tuneId,
    tunePromise,
    abcPromise,
    searchPromise;

  const [
    _empty,
    _search,
    encodedQuery,
    tuneIdTuneName,
    tuneVersion
  ] = params.slug.pathname.split('/');

  if (encodedQuery) {
    query = decodeFromQuery(encodedQuery);

    if (!tuneIdTuneName) {
      searchPromise = searchSession(query);
    }

    if (tuneIdTuneName && tuneIdTuneName.indexOf('-') !== -1) {
      const [tuneId, _tuneName] = tuneIdTuneName.split('-');
      tunePromise = fetchTuneById(tuneId);

      if (tuneVersion) {
        abcPromise = newGetAbc(tuneId, tuneVersion);
      }
    }
  }

  searchResults = await searchPromise;
  tune = await tunePromise;
  abc = await abcPromise;

  return {
    searchResults,
    tune,
    abc,
    query,
    tuneId,
    tuneVersion
  };
}
