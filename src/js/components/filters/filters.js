import React from 'react';
import './filters.scss';

const Filters = () => {
  return (
    <section className='filter-container'>
      <h2 className='screen-reader-only'>Filters</h2>
      <form>
        <label>
          Name:
          <input type='text' name='name' />
        </label>
        <label>
          Rarity:
        </label>
        <label>
          Name:
          <input type='text' name='name' />
        </label>
      </form>
    </section>
  );
};

export default Filters;