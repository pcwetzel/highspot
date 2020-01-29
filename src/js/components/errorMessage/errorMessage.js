import React from 'react';

import './errorMessage.scss';

const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <section className='error-message'>
      <h3>Loading Cards Error</h3>
      <div><strong>Reason:</strong> { message }</div>
    </section>
  );
}

export default ErrorMessage;