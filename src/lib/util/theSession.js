
const urlBase = 'https://thesession.org';

// https://thesession.org/tunes/search?q=humours&format=json
const searchSession = async (query, page = 1, signal) => {
	// console.log('send a request out to session:', `${urlBase}/tunes/search?q="${query}"&page=${page}&format=json`);
	const perPage = 50;
	const signalParam = signal ? { signal } : {};
	const response = await netRequest(
		'GET',
		`${urlBase}/tunes/search?q=${query}&page=${page}&format=json&perpage=${perPage}`,
		signalParam
	);
	// console.log('attempt to parse json...');
	const parsed_json = await response.json();
	// console.log('json parseing complete');
	if (response.ok) {
		// console.log('request was ok, return', parsed_json);
		return parsed_json;
	} else {
		// console.log('throwing an error!', parsed_json);
		throw new Error(parsed_json);
	}
};
// https://thesession.org/tunes/1/abc/1

const newGetAbc = async (tuneId, tuneVersion) => {
	// console.log('newGetAbc:', `${urlBase}/tunes/${tuneId}/abc/${tuneVersion}`);
	return netRequest(
		'GET',
		`${urlBase}/tunes/${tuneId}/abc/${tuneVersion}`
	).then(response => response.text());
};

// const fetchSessionTuneAbc = async (tuneUrl, tuneVersionIndex, signal) => {
//   // console.log(`fetchSessionTuneAbc(${tuneUrl}, ${tuneVersionIndex})`);
//   const signalParam = signal ? { signal } : {};
//   return netRequest(
//     'GET',
//     `/api/abc?url=${tuneUrl}&index=${tuneVersionIndex}`,
//     signalParam
//   ).then(response => response.text());
// };

const apiFetchSessionTuneAbc = async (tuneUrl, tuneVersionIndex) => {
	// console.log('requesting tune abc...');
	const abcUrl = `${tuneUrl}/abc/${tuneVersionIndex}`;
	const response = await netRequest('GET', abcUrl);
	const response_text = await response.text();
	if (response.ok) {
		// console.log('successfully requested abc');
		return response_text;
	} else {
		throw new Error(response_text);
	}
};

const fetchTuneById = async (id, signal) => {
	const signalParam = signal ? { signal } : {};
	const response = await netRequest(
		'GET',
		`${urlBase}/tunes/${id}?format=json`,
		signalParam
	);
	const parsed_json = await response.json();
	if (response.ok) {
		return parsed_json;
	} else {
		throw new Error(parsed_json);
	}
};

// const fetchTuneVersion = async (tuneUrl, tuneVersion, signal) => {
//   const signalParam = signal ? { signal } : {};
//   const response = await netRequest(
//     'GET',
//     `/api/abc?url=${tuneUrl}&index=${tuneVersion}`,
//     signalParam
//   );
//   const parsedTune = await response.text();
//   if (response.ok) {
//     return parsedTune;
//   } else {
//     throw new Error(parsedTune);
//   }
// };

const fetchSessionTune = async (url, signal) => {
	// console.log('searching for tune at', url);
	const signalParam = signal ? { signal } : {};
	const response = await netRequest('GET', `${url}?format=json`, signalParam);
	const parsed_json = await response.json();
	if (response.ok) {
		// console.log('returning succesful request');
		return parsed_json;
	} else {
		throw new Error(parsed_json);
	}
};

// https://stackoverflow.com/questions/46175660/fetch-retry-request-on-failure
const fetchRetry = (url, delay, tries, fetchOptions = {}) => {
	function onError(err){
		const triesLeft = tries - 1;
		if(!triesLeft){
			throw err;
		}
		return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
	}
	return fetch(url, fetchOptions).catch(onError);
};

const wait = (delay) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

const netRequest = async (method, url, params)  => {
	/** @type {object} */
	const fetch_options = {
		method: method,
		...params
	};
	let response = await fetchRetry(url, 1000, 3, fetch_options)
	return response;
};

export {
	searchSession,
	fetchSessionTune,
	// fetchSessionTuneAbc,
	newGetAbc,
	apiFetchSessionTuneAbc,
	netRequest,
	fetchTuneById,
	// fetchTuneVersion
};
