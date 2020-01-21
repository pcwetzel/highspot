import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const useFetch = url => {
  const [dataState, setDataState] = useState({ data: null, loading: true });

  useEffect(() => {
    setDataState(state => ({ data: state.data, loading: true }));
    fetch(url)
      .then(response => response.text())
      .then(responseText => {
        setDataState({
          data: responseText,
          loading: false
        });
      });
  }, [url, setDataState]);

  return dataState;
};

useFetch.propTyles = {
  url: PropTypes.string.isRequired
};