import React from 'react';
import './App.css';
import CardList from './js/components/cardList';
import Filters from './js/components/filters';
import {useFetch} from "./js/hooks/useFetch";
import {API_URL} from "./js/constants/endpoints";

function App() {
  const { data, loading } = useFetch(`${API_URL}?pageSize=20`);
  return (<>
    <Filters />
    { data && <CardList {...data} /> }
    { loading && <div>Loading...</div> }
  </>);
}

export default App;
