import React, { useState, useEffect } from 'react';
import './filters.scss';
import { fetchFilters } from "../../utils/apiLoader";
import PropTypes from "prop-types";
import { lookupInputNames, nonLookupInputs, nonLookupCheckboxes } from '../../constants/form-input-constants';

const capitalizeNoPlural = {
  regex: /^([a-z])(.+)s?$/i,
  replaceFunc: (m, p1, p2) => `${p1.toUpperCase()}${p2}`
};


const Filters = (props) => {

  const { filterSubmit, filterVisibilityToggle, filtersRef } = props;

  const [attributeList, setAttributeList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [setsList, setSetsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [subTypesList, setSubTypesList] = useState([]);
  const [builtForm, setBuiltForm] = useState({});

  useEffect(() => {
    const allFiltersPromise = fetchFilters();
    allFiltersPromise.then( filterResponses => {
      filterResponses.forEach(filterResponse => {
        if (!filterResponse?.data || !Object.keys(filterResponse.data)) {
          return;
        }
        const filter = Object.keys(filterResponse.data).filter(key => !/^_/.test(key))?.[0];
        filterResponse.data[filter].sort(filter === 'sets' ? setSort : undefined);
        switch (filter) {
          case 'attributes':
            setAttributeList(filterResponse.data.attributes.map(value => {
              return { name: value, value };
            }));
            break;
          case 'keywords':
            setKeywordsList(filterResponse.data.keywords.map(value => {
              return { name: value, value };
            }));
            break;
          case 'sets':
            setSetsList(filterResponse.data.sets.map(setObj => {
              return { name: setObj.name, value: setObj.id };
            }));
            break;
          case 'types':
            setTypesList(filterResponse.data.types.map(value => {
              return { name: value, value };
            }));
            break;
          case 'subtypes':
            setSubTypesList(filterResponse.data.subtypes.map(value => {
              return { name: value, value };
            }));
            break;
          default:
        }
      });
    });
  }, []);

  const setSort = (a, b) => {
    if (a?.name?.toLowerCase() < b?.name?.toLowerCase()) {
      return -1;
    }
    if (a?.name?.toLowerCase() > b?.name?.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const createSelectOptions = (filterName, filter) => {
    return (<>
      <option />
      { filter.map(opt => {
        return (<option key={`filter-${filterName}-${opt.value}`} value={opt.value}>{ opt.name }</option>);
      })
      }
    </>);
  };

  const createLookupInputs = (filterName, filter) => {
    const domId = `filter-${filterName}`;
    const label = (<label htmlFor={ domId }>
      { filterName.replace(capitalizeNoPlural.regex, capitalizeNoPlural.replaceFunc) }:
    </label>);

    const inputName = lookupInputNames?.[filterName] || filterName;
    if (filter?.length) {
      return (<div className='select-line'>
        { label }
        <div>
          <select id={ `filter-${filterName}`} name={ inputName } onChange={ handleOnChange }>
            { createSelectOptions(filterName, filter) }
          </select>
        </div>
      </div>);
    } else {
      return (<div>
        { label }
        <div>Loading...</div>
      </div>);
    }
  };

  const createNonLookupElements = (elements = [], postFix = '') => {
    return elements.map(input => {
      const domId = `filter-${input.name}`;
      const text = input.label ? input.label : input.name.replace(capitalizeNoPlural.regex, capitalizeNoPlural.replaceFunc);
      const label = (<label htmlFor={domId} key={`${domId}-label`}>
        { text }{ postFix }
      </label>);
      const field = (<div key={`${domId}-field`}>
        <input type={input.type} name={input.name} id={domId} onChange={ handleOnChange } />
      </div>);
      const lineOrder = input.type === 'checkbox' ? [field, label] : [label, field];

      return (<div key={`${domId}-container`} className={`${input.type}-line`}>
        { lineOrder }
      </div>);
    });
  };

  const handleOnChange = (event) => {
    const inputTarget = event.target;
    const inputName = inputTarget?.name;
    if (!inputName) {
      return;
    }
    let value;
    if (inputTarget.type === 'checkbox') {
      value = inputTarget.checked ? 'true' : '';
    } else {
      value = inputTarget?.value.trim();
    }
    if (value) {
      setBuiltForm(Object.assign({}, builtForm, { [inputName] : value }));
    } else {
      // Disabling linter due to needing a throwaway variable to remove
      const { [inputName]: throwAwayVar, ...removeValueForm} = builtForm;    // eslint-disable-line no-unused-vars
      setBuiltForm(removeValueForm);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    filterSubmit(builtForm);
  };

  return (<aside ref={ filtersRef }
                 className={`filter-container ${filterVisibilityToggle ? 'active' : ''}` }
                 id='filter-container'
                 aria-labelledby='filter-button'>
      <section>
        <h2>Filters Cards</h2>
        <form onSubmit={ submitHandler }>
          { createNonLookupElements(nonLookupInputs, ':') }
          { createLookupInputs('attributes', attributeList) }
          { createLookupInputs('keywords', keywordsList) }
          { createLookupInputs('sets', setsList) }
          { createLookupInputs('types', typesList) }
          { createLookupInputs('subTypes', subTypesList) }
          { createNonLookupElements(nonLookupCheckboxes) }

          <div>
            <button className='cta'><div>Filter</div></button>
          </div>
        </form>
      </section>
    </aside>
  );
};

Filters.propTypes = {
  filterSubmit: PropTypes.func.isRequired,
  filterVisibilityToggle: PropTypes.bool.isRequired,
  filtersRef: PropTypes.object.isRequired
};

export default Filters;