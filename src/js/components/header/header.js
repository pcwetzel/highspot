import React, { useState, useRef } from 'react';

import './header.scss';
import CardCount from "../cardCount";
import PropTypes from "prop-types";
import Filters from "../filters";
import FilterButton from "../filterButton";

const Header = (props) => {
  const { totalCards, showTotalCards, paintFilters, handleFilterSubmit } = props;

  const [filterVisibilityToggle, setFilterVisibilityToggle] = useState(false);
  const filtersRef = useRef(null);

  const handleFilterToggle= (newFilterVisibility) => {
    setFilterVisibilityToggle(newFilterVisibility);
  };

  return (
    <div className='fixed-content'>
      <header>
        <div>
          { paintFilters && <FilterButton
              filterVisibility={ filterVisibilityToggle }
              handleFilterToggle={ handleFilterToggle }
              filtersRef={filtersRef} />
          }
        </div>
        <div>
          <h1>Elder Scrolls Legends Card Lookup</h1>
        </div>
        <div>
          { showTotalCards && <CardCount totalCards={ totalCards }/> }
        </div>
      </header>
      { paintFilters && <Filters filterSubmit={ handleFilterSubmit }
                                 filterVisibilityToggle={ filterVisibilityToggle }
                                 filtersRef={ filtersRef } /> }
    </div>
  );
};

Header.propTypes = {
  totalCards: PropTypes.number.isRequired,
  showTotalCards: PropTypes.bool.isRequired,
  paintFilters: PropTypes.bool.isRequired,
  handleFilterSubmit: PropTypes.func.isRequired
};

export default Header;