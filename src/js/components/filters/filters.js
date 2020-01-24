import React from 'react';
import './filters.scss';

const alphaSort = (a, b) => {
  console.log(`(a: ${a?.name?.toLowerCase()} > b: ${b?.name?.toLowerCase()} = ${(a?.name?.toLowerCase() > b?.name?.toLowerCase())}`);
  if (a?.name?.toLowerCase() < b?.name?.toLowerCase()) {
    return -1;
  }
  if (a?.name?.toLowerCase() > b?.name?.toLowerCase()) {
    return 1;
  }
  return 0;
};

const createSelectOptions = (data = [], isSetsOption = false) => {
  if (!data.length) {
    return (<option value=''>No values found</option>);
  }
  console.group('%ccreateSelectOptions', 'background-color: green; color: yellow');
  console.log(data);
  data.sort(alphaSort);
  console.log(data);
  console.groupEnd();
  return data.map(opt => {
    const val = isSetsOption ? opt.id : opt.name;
    return (<option key={ val } value={ val }>{ opt.name }</option>);
  });
};


const Filters = (props) => {
  const { sets, attribtues, keywords, types, subtypes } = props;

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
          Sets:
          { sets?.loading ? <div>loading...</div> : <select name="set.id">
            { createSelectOptions(sets?.data?.sets, true) }
            </select>
          }
        </label>
        <label>
          attribtues:
          { sets?.loading ? <div>loading...</div> : <select name="set.id">
            { createSelectOptions(sets?.data?.sets, true) }
          </select>
          }
        </label>
        <label>
          Sets:
          { sets?.loading ? <div>loading...</div> : <select name="set.id">
            { createSelectOptions(sets?.data?.sets, true) }
          </select>
          }
        </label>
        <label>
          Sets:
          { sets?.loading ? <div>loading...</div> : <select name="set.id">
            { createSelectOptions(sets?.data?.sets, true) }
          </select>
          }
        </label>
      </form>
    </section>
  );
};

export default Filters;