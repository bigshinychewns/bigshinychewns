import { searchSession } from '$lib/util/theSession';
import { newGetAbc, fetchTuneById } from '$lib/util/theSession';
import { decodeFromQuery } from '$lib/util/urlParams';

export async function get({ url }) {
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
  ] = url.pathname.split('/');

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
    body: {
      searchResults,
      tune,
      abc,
      query,
      tuneId,
      tuneVersion
    }
  };
}
