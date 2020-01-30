import React from 'react';

const Checkmark = (props) => {
  const { title, checked } = props;
  return (<div className={checked ? 'checkmark' : ''}><span className='screen-reader-only'>{title} </span></div>);
};

export default Checkmark;