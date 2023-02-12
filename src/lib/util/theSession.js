
const urlBase = 'https://thesession.org';

// https://thesession.org/tunes/search?q=humours&format=json
const searchSession = async (query, page = 1, signal) => {
	const perPage = 50;
	const signalParam = signal ? { signal } : {};
	const url = `${urlBase}/tunes/search?q=${query}&page=${page}&format=json&perpage=${perPage}`;

	return await cachedNetRequest(url, signalParam);
};
// https://thesession.org/tunes/1/abc/1

const newGetAbc = async (tuneId, tuneVersion) => {
	const url = `${urlBase}/tunes/${tuneId}/abc/${tuneVersion}`;
	return await cachedNetRequest(url, {}, r => r.text());
};

const fetchTuneById = async (id, signal) => {
	const signalParam = signal ? { signal } : {};
	return await cachedNetRequest(
		`${urlBase}/tunes/${id}?format=json`,
		signalParam
	);
};

const fetchSessionTune = async (url, signal) => {
	const signalParam = signal ? { signal } : {};
	return await cachedNetRequest(`${url}?format=json`, signalParam);
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

let netCache = {};

const cachedNetRequest = async (
	url,
	params = {},
	callback = r => r.json(),
) => {
	if (netCache[url]) {
		return netCache[url];
	}
	const response = await netRequest(url, params).then(callback);
	netCache[url] = response;
	return response;
}

const netRequest = async (url, params)  => {
	/** @type {object} */
	const fetch_options = {
		method: 'GET',
		...params
	};
	let response = await fetchRetry(url, 1000, 3, fetch_options)
	return response;
};

export {
	searchSession,
	fetchSessionTune,
	newGetAbc,
	fetchTuneById,
};
