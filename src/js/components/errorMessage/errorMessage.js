import React from 'react';
import PropTypes from "prop-types";

import './errorMessage.scss';

const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <section className='error-message'>
      <h3>Loading Cards Error</h3>
      { message && <div><strong>Reason:</strong> { message }</div> }
    </section>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};


export default ErrorMessage;