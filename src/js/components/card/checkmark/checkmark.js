import React from 'react';
import PropTypes from 'prop-types';

const Checkmark = (props) => {
  const { title, checked } = props;
  return (
    <div className={checked ? 'checkmark' : ''}>
      { title && <span className='screen-reader-only'>{title}</span> }
    </div>);
};

Checkmark.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool
};

export default Checkmark;