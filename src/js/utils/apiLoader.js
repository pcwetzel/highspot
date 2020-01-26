import * as API from "../constants/endpoint-constants";

const baseReturn = {
  loading: false,
  error: null
};

function fetchUrl(url, prop = null) {

  const getData = fetch(url)
    .then(response => {
      if (!response || response?.status !== 200) {
        return Promise.reject( `Unable to load API. HTTP Status Code ${response?.status}`);
      }
      return response.text();
    })
    .then(responseText => {
      let data = null;
      try {
        data = JSON.parse(responseText);
      } catch(e) {
        return Promise.reject('Unable to transform response into json');
      }
      console.log('data came back');
      let returnObject = (prop && data?.[prop]) ? { [prop] : data[prop] } : { data };
      return Object.assign({}, baseReturn, returnObject, { totalCount: data?._totalCount});
    })
    .catch(reason => {
      console.error('API Fetch Error: ', reason);
      return Object.assign({}, baseReturn, { error: reason });
    });
  console.log('getData', getData);
  return getData;
}

const buildQueryString = (params = null) => {
  if (params) {
    return '?' + Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }).join('&');
  }
  return '';
};

const fetchFilters = async () => {
  return await Promise.all([
    fetchUrl(API.FILTER_ATTRIBUTES),
    fetchUrl(API.FILTER_KEYWORDS),
    fetchUrl(API.FILTER_SETS),
    fetchUrl(API.FILTER_TYPES),
    fetchUrl(API.FILTER_SUBTYPES)
  ]);
};

const fetchCards = async (extraParameters = null) => {
  const params = Object.assign({}, extraParameters, { [API.PARAM_PAGE_SIZE]: API.MAX_PAGE_SIZE });
  const requestedPage = params?.[API.PARAM_PAGE] || 1;
  params[API.PARAM_PAGE] = requestedPage;
  console.log(params);
  let cardData = await fetchUrl(`${API.CARDS}${ buildQueryString(params)}`, 'cards');
  console.log('cardData***************', cardData);
  const totalCards = cardData?.error ? 0 : cardData?.totalCount;
  const hasMoreCards = cardData?.error ? false : (requestedPage * API.MAX_PAGE_SIZE) < totalCards;
  const cards = cardData?.error ? [] : cardData?.cards;

  console.log('(requestedPage * API.MAX_PAGE_SIZE) < totalCards');
  console.log(`(${requestedPage} * ${API.MAX_PAGE_SIZE}) < ${totalCards}: ${(requestedPage * API.MAX_PAGE_SIZE) < totalCards}`);

  console.group('card data returned');
  console.log(cardData);
  console.groupEnd();
  return {
    loading: cardData?.loading,
    error: cardData?.error,
    cards,
    hasMoreCards,
    totalCards
  };
};

export {
  fetchCards,
  fetchFilters
};