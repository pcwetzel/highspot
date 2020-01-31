import React from "react";
import PropTypes from "prop-types";
import { useUID } from 'react-uid';

import './filterButton.scss';

const FilterButton = (props) => {
  const { filterVisibility, handleFilterButtonClick } = props;
  const uid = useUID();

  let currentVisibility =  filterVisibility;

  const filterButtonClick = () => {
    currentVisibility = !currentVisibility;
    handleFilterButtonClick(currentVisibility);
  };

  return (<>
    <button className={`cta ${currentVisibility ? 'active' : ''}`}
                  id='filter-button'
                  aria-expanded={ currentVisibility }
                  aria-controls='filter-container'
                  onClick={ filterButtonClick }
          >
    <div className='small-only'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 0 393 393.99303" width="25px" height="25px" aria-describedby={`filters-svg-${uid}`} role='img'>
        <title id={`filters-svg-${uid}`}>Filters</title>
        <path id='filter-svg-inner'
          d="m368.3125 10c2.5.015625 4.78125 1.4375 5.890625 3.675781 1.109375 2.242188.863281 4.914063-.640625 6.914063l-128.679688 181.28125c-5.949218 8.046875-9.171874 17.78125-9.199218 27.789062v120.011719c0 2.648437-1.308594 5.289063-3.929688 5.949219l-72.878906 27.789062c-2.019531.933594-4.371094.769532-6.238281-.4375-1.867188-1.210937-2.980469-3.289062-2.953125-5.511718v-147.800782c-.027344-10.007812-3.25-19.742187-9.199219-27.789062l-128.679687-181.28125c-1.503907-2-1.75-4.671875-.640626-6.914063 1.109376-2.238281 3.390626-3.660156 5.890626-3.675781zm0 0"
          fill="#000000"/>
        <path
          d="m368.3125 0h-351.257812c-6.199219-.0117188-11.878907 3.449219-14.710938 8.960938-2.871094 5.589843-2.3671875 12.320312 1.304688 17.417968l128.679687 181.28125c.042969.058594.089844.121094.132813.183594 4.679687 6.3125 7.207031 13.960938 7.222656 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773437 11.683593 3.085938 3.105469 7.28125 4.847657 11.65625 4.847657 2.226563 0 4.429688-.445313 6.484375-1.300782l72.316406-27.574218c6.46875-1.976563 10.769532-8.085938 10.769532-15.445313v-120.011719c.015625-7.859375 2.546875-15.503906 7.222656-21.820312l.132812-.183594 128.679688-181.28125c3.671875-5.101562 4.171875-11.824219 1.300781-17.414062-2.828125-5.511719-8.507812-8.9726568-14.707031-8.960938zm-131.523438 196c-7.1875 9.75-11.082031 21.542969-11.105468 33.660156v117.570313l-66 25.167969v-142.738282c-.023438-12.117187-3.914063-23.914062-11.105469-33.667968l-124.929687-175.992188h338.070312zm0 0"
          fill="#C5AC59"/>
      </svg>
    </div>
    <div className='medium-and-bigger'>Filters</div>
  </button>
  </>);
};

FilterButton.propTypes = {
  filterVisibility: PropTypes.bool.isRequired,
  handleFilterButtonClick: PropTypes.func.isRequired
};

export default FilterButton;