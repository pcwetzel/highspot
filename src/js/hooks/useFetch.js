import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  data: null,
  loading: true,
  error: false
};

const requestHeaders = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const useFetch = url => {
  const [dataState, setDataState] = useState(INITIAL_STATE);

  useEffect(() => {
    setDataState(state => ({ data: state.data, loading: true, error: false }));

    // console.log('dataState 1');
    // console.log(dataState);
    fetch(url, requestHeaders)
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
        // console.log('dataState 2');
        // console.log(dataState);
        setDataState({
          data,
          loading: false,
          error: false
        });
        // console.log('dataState 3');
        // console.log(dataState);
      })
      .catch(reason => {
        console.error('API Fetch Error: ', reason);
        setDataState({
          data: null,
          loading: false,
          error: true
        });
    });
  }, [url, setDataState]);

  return dataState;
};

useFetch.propTyles = {
  url: PropTypes.string.isRequired
};