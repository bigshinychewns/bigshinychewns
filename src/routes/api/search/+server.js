import { searchSession } from "$lib/util/theSession";

export async function get(params) {
  console.log('request into the api search');
  const query = params.url.searchParams.get('q');
  console.log('searching session for ', query);
  const response = await searchSession(query);
  const fuck = {
    body: response
  };

  console.log('fuck:' , fuck);
  return fuck;
}
