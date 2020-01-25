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

const fetchCards = async (extraParameters = null) => {
  const params = Object.assign({}, extraParameters, { [API.PARAM_PAGE_SIZE]: API.MAX_PAGE_SIZE });
  const requestedPage = params?.[API.PARAM_PAGE] || 1;
  params[API.PARAM_PAGE] = requestedPage;
  console.log(params);
  let cardData = await fetchUrl(`${API.CARDS}${ buildQueryString(params)}`, 'cards');
  console.log('cardData***************', cardData);
  const totalCards = cardData?.totalCount;
  const hasMoreCards = (requestedPage * API.MAX_PAGE_SIZE) < totalCards;

  console.log('(requestedPage * API.MAX_PAGE_SIZE) < totalCards');
  console.log(`(${requestedPage} * ${API.MAX_PAGE_SIZE}) < ${totalCards}: ${(requestedPage * API.MAX_PAGE_SIZE) < totalCards}`);

  console.group('card data returned');
  console.log(cardData);
  console.groupEnd();
  return {
    cards: cardData?.cards,
    loading: cardData?.loading,
    error: cardData?.error,
    hasMoreCards: hasMoreCards
  };
};

export {
  fetchCards
};