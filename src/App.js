import React, { useEffect, useState } from 'react';
import Header from './js/components/header';
import CardList from './js/components/cardList';
import ErrorMessage from './js/components/errorMessage';
import ScrollLoader from './js/components/scrollLoader';
import { fetchCards } from "./js/utils/apiLoader";
import * as API from './js/constants/endpoint-constants';

import './App.scss';
import LoadingIndicator from './js/components/loadingIndicator';


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
    const nextPage = currentPage + 1;
    const newApiCall = Object.assign({}, cardApiParams, { [API.PARAM_PAGE] : nextPage });
    setCardApiParams(newApiCall);
    setCurrentPage(nextPage);
  };


  const handleFilterSubmit = (builtForm = {}) => {
    setCardData([]);
    setCurrentPage(1);
    setCardApiParams(Object.assign({}, builtForm, { [API.PARAM_PAGE] : 1 }));
  };

  useEffect(() => {
    setCardDataLoading(true);
    const cardPromise = fetchCards(cardApiParams);
    cardPromise.then( cardResponse => {
      setCardDataLoading(false);
      setCardError(cardResponse?.error);
      setCardData((c) => [...c, ...cardResponse?.cards]);
      setHasMoreCards(cardResponse?.hasMoreCards);
      setTotalCards(cardResponse?.totalCards);
    });
  }, [cardApiParams]);

  const paintFilters = !cardError;
  const showTotalCards = !cardError && (!cardDataLoading || currentPage > 1);

  return (<>
      <Header totalCards={ totalCards }
              showTotalCards={ showTotalCards }
              paintFilters={ paintFilters }
              handleFilterSubmit={ handleFilterSubmit } />
      <main data-testid='main'>
        { cardError && <ErrorMessage message={ cardError } /> }
        { cardData && <CardList cards={ cardData } /> }
        <LoadingIndicator showLoading={ cardDataLoading }/>
        { hasMoreCards && <ScrollLoader cardDataLoading={ cardDataLoading } loadNextPage={ loadNextPage } /> }
      </main>
    </>
  );
}

export default App;
