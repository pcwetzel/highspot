import React, { useEffect, useState } from 'react';
import Header from './js/components/header';
import Filters from './js/components/filters';
import CardList from './js/components/cardList';
import ScrollLoader from './js/components/scrollLoader';
import { fetchCards } from "./js/utils/apiLoader";
import * as API from './js/constants/endpoint-constants';

import './App.css';


function App() {

  const [cardData, setCardData] = useState([]);
  const [cardDataLoading, setCardDataLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [hasMoreCards, setHasMoreCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [cardApiParams, setCardApiParams] = useState(() => {
    return { [API.PARAM_PAGE] : currentPage };
  });

  const loadNextPage = () => {
    console.log('loading next page - current page: ', currentPage);
    const nextPage = currentPage + 1;
    const newApiCall = Object.assign({}, cardApiParams, { [API.PARAM_PAGE] : nextPage });
    setCardApiParams(newApiCall);
    setCurrentPage(nextPage);
    console.log(`currentPage: ${currentPage} - newApiCall: `, JSON.parse(JSON.stringify(newApiCall)));
  };


  const handleFilterSubmit = (builtForm = {}) => {
    console.group('%chandleFilterSubmit', 'background-color: red; color: white; font-weight: bold;');
    console.log(builtForm);
    console.groupEnd();
    setCardData([]);
    setCurrentPage(1);
    setCardApiParams(Object.assign({}, builtForm, { [API.PARAM_PAGE] : 1 }));
  };

  useEffect(() => {
    setCardDataLoading(true);
    const cardPromise = fetchCards(cardApiParams);
    cardPromise.then( cardResponse => {
      console.log('baaack', cardResponse);
      setCardDataLoading(false);
      setCardError(cardResponse?.error);
      setCardData((c) => [...c, ...cardResponse?.cards]);
      setHasMoreCards(cardResponse?.hasMoreCards);
      setTotalCards(cardResponse?.totalCards);
    });
  }, [cardApiParams]);




  /*
    useEffect(() => {
      console.log(`loading ${loading}`);
      setLoading(true);
      console.log(`loading ${loading}`);

      const cardPromise = fetchCards(`${API.CARDS}?${PARAM_PAGE_SIZE}=${INITIAL_PAGE_SIZE}`);
      cardPromise.then( cardResponse => {
        console.log('cardResponse');
        console.log(cardResponse);
        setIsCardsLoading(cardResponse?.loading);
        setCardData(cardResponse?.data);
        console.log('cardData', cardData);
        console.log('cardsLoading', cardsLoading);
      });
    }, []);

  */
/*

  const cardData = useFetch(`${API.CARDS}?${API.PARAM_PAGE_SIZE}=${INITIAL_PAGE_SIZE}`);
  const possibleFilterValues = {
    sets: useFetch(API.SETS),               // Get all the possible set names (and other per set attributes)
    attributes: useFetch(API.ATTRIBUTES),   // Get all the possible card attribute values
    keywords: useFetch(API.KEYWORDS),       // Get all the possible card keyword values
    types: useFetch(API.TYPES),             // Get all the possible card types
    subtypes: useFetch(API.SUBTYPES)       // Get all the possible card subtypes
  };
*/


  return (<>
      <Header totalCards={ totalCards } showTotalCards={ !cardError && !cardDataLoading }/>
      <main>
        { !cardError && <Filters filterSubmit={ handleFilterSubmit }/> }
        { cardError && <section className='loading-error'><h3>Loading Cards Error</h3><div>Reason: {cardError}</div></section> }
        { cardData && <CardList cards={cardData} /> }
        { cardDataLoading && <div className="loading-indicator">Loading ...</div> }
        { hasMoreCards && <ScrollLoader cardDataLoading={cardDataLoading} loadNextPage={loadNextPage} /> }
      </main>
    </>
  );
}

export default App;
