import { newGetAbc } from '$lib/util/theSession';

export async function get({ params }) {
  const abc = await newGetAbc(params.tuneId, params.tuneVersion);
  return {
    body: {
      abc,
    }
  };
}
