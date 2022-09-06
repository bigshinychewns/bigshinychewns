import { newGetAbc } from '$lib/util/theSession';

export async function get({ params }) {
  const { tuneId, tuneVersion } = params;
  const abc = await newGetAbc(tuneId, tuneVersion);

  return {
    body: {
      abc,
      tuneId,
      tuneVersion
    }
  };
}
