import React, { useEffect, useState } from 'react';
import Header from './js/components/header';
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

  const paintFilters = !cardError;
  const showTotalCards = !cardError && !cardDataLoading;

  return (<>
      <Header totalCards={ totalCards }
              showTotalCards={ showTotalCards }
              paintFilters={ paintFilters }
              handleFilterSubmit={ handleFilterSubmit } />
      <main data-testid='main'>
        { cardError && <section className='loading-error'><h3>Loading Cards Error</h3><div>Reason: {cardError}</div></section> }
        { cardData && <CardList cards={cardData} /> }
        { cardDataLoading && <div className="loading-indicator">Loading ...</div> }
        { hasMoreCards && <ScrollLoader cardDataLoading={cardDataLoading} loadNextPage={loadNextPage} /> }
      </main>
    </>
  );
}

export default App;
