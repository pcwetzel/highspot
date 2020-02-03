import React from 'react';
import { useUID } from 'react-uid';
import PropTypes from 'prop-types';

const Checkmark = (props) => {
  const { title, checked } = props;
  const displayTitle = title || 'checked';
  const uid = useUID();

  return (
    <div className='checkmark-container'>
      { checked && <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="18px" viewBox="0, 0, 193, 202" aria-labelledby={ `checkmark-${uid}` } role='img'>
        <title id={ `checkmark-${uid}` }>{ displayTitle }</title>
        <path d="M1,135.389 C2.942,127.09 19.452,118.303 29.649,120.743 C35.476,122.208 42.76,151.987 48.101,153.451 C48.101,153.451 48.101,153.451 48.101,153.451 C48.101,153.451 48.101,153.451 48.101,153.451 C52.402,151.53 63.388,132.524 80.635,106.586 C98.443,79.805 122.785,45.715 144.246,20.667 C144.246,20.667 144.246,20.667 144.246,20.667 C144.246,20.667 144.246,20.667 144.246,20.667 C144.246,20.667 144.246,20.667 144.246,20.667 C145.217,19.202 146.674,17.738 146.674,16.761 C150.073,12.368 162.213,4.557 170.468,2.604 C177.751,1.14 189.891,-0.325 191.833,3.092 C193.775,6.51 178.237,26.037 172.41,31.895 C153.958,53.863 87.919,141.735 77.722,162.239 C74.323,166.144 62.669,185.183 52.472,197.876 C40.332,203.734 26.25,199.828 21.88,198.364 C14.111,187.624 1,150.522 1,135.389 z" fill="#099800"/>
      </svg> }
      { !checked && <span aria-label={ `not ${displayTitle}` }>-</span> }
    </div>);
};

Checkmark.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool
};

export default Checkmark;