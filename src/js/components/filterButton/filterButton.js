import React, { useRef } from "react";
import PropTypes from "prop-types";

const FilterButton = (props) => {
  const { handleFilterButtonClick } = props;
  let { filterVisibility } = props;

  const filtersButton = useRef(null);

  const filterButtonClick = () => {
    filterVisibility = !filterVisibility;
    handleFilterButtonClick(filterVisibility);
  };

  return (<button className={`cta ${filterVisibility && 'active'}`} ref={ filtersButton } onClick={ filterButtonClick }>
    <div>Filters</div>
  </button>);
};

FilterButton.propTypes = {
  filterVisibility: PropTypes.bool.isRequired,
  handleFilterButtonClick: PropTypes.func.isRequired
};

export default FilterButton;