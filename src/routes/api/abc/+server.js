import { apiFetchSessionTuneAbc } from "$lib/util/theSession";

export async function get(params) {
  const url = params.url.searchParams.get('url');
  const index = params.url.searchParams.get('index');
  const response = await apiFetchSessionTuneAbc(url, index);
  return {
    body: response
  };
}
