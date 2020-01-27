import React, { useRef } from "react";
import PropTypes from "prop-types";

const FilterButton = (props) => {
  const { filterVisibility, handleFilterButtonClick } = props;
  const filtersButton = useRef(null);

  const filterButtonClick = () => {
    handleFilterButtonClick(filterVisibility === 'active' ? 'deactivate' : 'active');
    filtersButton.current.classList.toggle('active');
  };


  return (<button className='cta' ref={ filtersButton } onClick={ filterButtonClick }>
    <div>Filters</div>
  </button>);
};

FilterButton.propTypes = {
  filterVisibility: PropTypes.string.isRequired,
  handleFilterButtonClick: PropTypes.func.isRequired
};

export default FilterButton;