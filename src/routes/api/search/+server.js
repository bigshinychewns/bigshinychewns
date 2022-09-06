// // throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

// import { searchSession } from "$lib/util/theSession";

// export async function GET({ params }) {
//   console.log('request into the api search');
//   const query = params.url.searchParams.get('q');
//   console.log('searching session for ', query);
//   const response = await searchSession(query);
//   const fuck = {
//     body: response
//   };

//   console.log('fuck:' , fuck);
//   return fuck;
// }
