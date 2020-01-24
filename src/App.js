import React from 'react';
import './App.css';
import CardList from './js/components/cardList';
import Filters from './js/components/filters';
import {useFetch} from "./js/hooks/useFetch";
import * as API from "./js/constants/endpoint-constants";

const INITIAL_PAGE_SIZE = 20;


function App() {


  const cardData = useFetch(`${API.CARDS}?${API.PARAM_PAGE_SIZE}=${INITIAL_PAGE_SIZE}`);
  const possibleFilterValues = {
    sets: useFetch(API.SETS),               // Get all the possible set names (and other per set attributes)
    attributes: useFetch(API.ATTRIBUTES),   // Get all the possible card attribute values
    keywords: useFetch(API.KEYWORDS),       // Get all the possible card keyword values
    types: useFetch(API.TYPES),             // Get all the possible card types
    subtypes: useFetch(API.SUBTYPES)       // Get all the possible card subtypes
  };

  /*
  console.group('App');
  console.log(cardData.data, cardData.loading, cardData.error);
  console.log('possibleFilterValues');
  console.log(possibleFilterValues);
  console.groupEnd();
*/
  return (<>
    <Filters { ...possibleFilterValues } />
    { cardData.data && <CardList {...cardData.data} /> }
    { cardData.loading && <div>Loading...</div> }
    { cardData.error && <div>Error...</div> }
  </>);
}

export default App;
