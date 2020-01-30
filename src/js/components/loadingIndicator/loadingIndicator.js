import React from 'react';
import PropTypes from "prop-types";

import './loadingIndicator.scss';

const LoadingIndicator = (props) => {
  const { showLoading } = props;
  if (!showLoading) {
    return null;
  }
  return (<section className='loading-indicator'>
    <svg xmlns='http://www.w3.org/2000/svg' width='51px' height='51px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' aria-hidden='true'>
      <path d='M9 50A41 41 0 0 0 91 50A41 47.9 0 0 1 9 50' fill='#d9a73d' stroke='none' transform='rotate(256.659 50 53.45)'>
        <animateTransform attributeName='transform' type='rotate' dur='1.4492753623188404s' repeatCount='indefinite' keyTimes='0;1' values='0 50 53.45;360 50 53.45' />
      </path>
    </svg>
    <h2>Loading ...</h2>
  </section>);
};

LoadingIndicator.propTypes = {
  showLoading: PropTypes.bool.isRequired
};

export default LoadingIndicator;