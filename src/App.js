import React, { useEffect, useState } from 'react';
import './App.css';
import CardList from './js/components/cardList';
import ScrollLoader from './js/components/scrollLoader';
// import Filters from './js/components/filters';
// import {useFetch} from "./js/hooks/useFetch";
import { fetchCards } from "./js/utils/apiLoader";



function App() {

  const [cardData, setCardData] = useState([]);
  const [cardDataLoading, setCardDataLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [hasMoreCards, setHasMoreCards] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadNextPage = () => {
    console.log('loading next page');
    setCurrentPage(cp => cp + 1);
  };

  useEffect(() => {
    setCardDataLoading(true);
    const cardPromise = fetchCards({ page: currentPage });
    cardPromise.then( cardResponse => {
      console.log('baaack', cardResponse);
      setCardDataLoading(false);
      setCardError(cardResponse?.error);
      setCardData((c) => [...c, ...cardResponse?.cards]);
      setHasMoreCards(cardResponse?.hasMoreCards);
    });
  }, [currentPage]);




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
      <button onClick={() => setHasMoreCards(!hasMoreCards) }>Toggle HasMoreCards</button>
      { cardError && <div><h3>Loading Cards Error</h3><div>Reason: {cardError}</div></div> }
      { cardData && <CardList cards={cardData} /> }
      { cardDataLoading && <div className="loading-indicator">Loading ...</div> }
      { hasMoreCards && <ScrollLoader cardDataLoading={cardDataLoading} loadNextPage={loadNextPage} /> }
    </>
  );
}

export default App;
