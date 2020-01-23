import React from 'react';
import './App.css';
import CardList from './js/components/cardList';
import Filters from './js/components/filters';
import {useFetch} from "./js/hooks/useFetch";
import {API_CARDS, API_PARAM_PAGE_SIZE} from "./js/constants/endpoint-constants";

const INITIAL_PAGE_SIZE = 20;

function App() {
  const { data, loading, error } = useFetch(`${API_CARDS}?${API_PARAM_PAGE_SIZE}=${INITIAL_PAGE_SIZE}`);
  console.log(data, loading, error);
  return (<>
    <Filters />
    { data && <CardList {...data} /> }
    { loading && <div>Loading...</div> }
    { error && <div>Error...</div> }
  </>);
}

export default App;
