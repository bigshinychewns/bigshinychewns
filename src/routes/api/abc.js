import { apiFetchSessionTuneAbc } from "$lib/util/theSession";

export async function get(params) {
  console.log('request into the api abc requestor');
  const url = params.url.searchParams.get('url');
  const index = params.url.searchParams.get('index');
  console.log('requesting abc from ', url);
  const response = await apiFetchSessionTuneAbc(url, index);
  const fuck = {
    body: response
  };

  console.log('fuck:' , fuck);
  return fuck;
}
