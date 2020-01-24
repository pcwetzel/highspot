import React from 'react';
import './filters.scss';
import PropTypes from "prop-types";

const setSort = (a, b) => {
  if (a?.name?.toLowerCase() < b?.name?.toLowerCase()) {
    return -1;
  }
  if (a?.name?.toLowerCase() > b?.name?.toLowerCase()) {
    return 1;
  }
  return 0;
};



const populateSimpleFilters = (simpleFilters = {}) => {
  return Object.keys(simpleFilters).map((filter, index) => {
    const filterObj = simpleFilters[filter];
    if (!filterObj?.loading && !filterObj?.data?.[filter]) {
      return null;
    }
    if (filterObj?.data?.[filter]) {
      filterObj.data[filter].sort();
    }
    return (<div key={`${filter}-${index}`}>
        <label htmlFor={`${filter}-input`}>
          { filter.replace(/^([a-z])(.+)s?$/i, (m, p1, p2) => `${p1.toUpperCase()}${p2}` ) }:
        </label>
        { filterObj?.loading ? <div>loading...</div> : <select id={`${filter}-input`} name={ filter }>
          { filterObj?.data?.[filter]?.map((opt, i) => (<option key={`${filter}-${opt}-${i}`}>{ opt }</option>))}
        </select> }
      </div>
    );
  });
};

const populateSetsFilter = (sets = {}) => {
  if (!sets?.loading && !sets?.data?.sets) {
    return null;
  }
  if (sets?.data?.sets) {
    sets.data.sets.sort(setSort);
  }
  return (<div>
      <label htmlFor='set-input'>Sets:</label>
        { sets?.loading ? <div>loading...</div> : <select id='set-input' name='sets.id'>
          { sets?.data?.sets?.map(opt => (<option key={`set-${opt.id}`}>{ opt.name }</option>))}
      </select> }
    </div>
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
};

const Filters = (props) => {
  const { sets, ...otherFilters } = props;
  return (
    <section className='filter-container'>
      <h2>Filters Cards By</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor='name-input'>
            Name:
          </label>
          <input type='text' name='name' id='name-input' />
        </div>
        <div>
          <label htmlFor='rarity-input'>
            Rarity:
          </label>
          <input type='text' name='rarity' id='rarity-input' />
        </div>
        { populateSetsFilter(sets) }
        { populateSimpleFilters(otherFilters) }
        <div>
          <input type='submit' value='Filter' />
        </div>
      </form>
    </section>
  );
};


Filters.propTypes = {
  sets: PropTypes.object,
  otherFilters: PropTypes.object
};

export default Filters;