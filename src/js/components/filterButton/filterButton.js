import React from "react";
import PropTypes from "prop-types";

const FilterButton = (props) => {
  const { handleFilterButtonClick } = props;
  let { filterVisibility } = props;

  const filterButtonClick = () => {
    filterVisibility = !filterVisibility;
    handleFilterButtonClick(filterVisibility);
  };

  return (<button className={`cta ${filterVisibility && 'active'}`}
                  id='filter-button'
                  aria-expanded={ filterVisibility }
                  aria-controls='filter-container'
                  onClick={ filterButtonClick }
          >
    <div className='small-only'>Filters</div>
    <div className='medium-and-bigger'>Filters</div>
  </button>);
};

FilterButton.propTypes = {
  filterVisibility: PropTypes.bool.isRequired,
  handleFilterButtonClick: PropTypes.func.isRequired
};

export default FilterButton;