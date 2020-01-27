import React, { useRef, useState, useEffect } from 'react';
import './filters.scss';
import { fetchFilters } from "../../utils/apiLoader";
import PropTypes from "prop-types";

const capitalizeNoPlural = {
  regex: /^([a-z])(.+)s?$/i,
  replaceFunc: (m, p1, p2) => `${p1.toUpperCase()}${p2}`
};

// Some values that are received had different names when we try to filter.
// Example: We get "types" via the Types API, but send "type"
const lookupInputNames = {
  sets: 'set.id',
  subTypes: 'subtypes',
  types: 'type'
};

const nonLookupInputs = [
  {
    name: 'name',
    type: 'text'
  },
  {
    name: 'rarity',
    type: 'text'
  },
  {
    name: 'cost',
    type: 'number'
  },
  {
    name: 'power',
    type: 'number'
  },
  {
    name: 'health',
    type: 'number'
  },
  {
    label: 'Rules',
    name: 'text',
    type: 'text'
  }
];

const nonLookupCheckboxes = [
  {
    label: 'Unique Card',
    name: 'unique',
    type: 'checkbox'
  }
];


const Filters = (props) => {

  const { filterSubmit, filterVisibilityToggle } = props;

  const formRef = useRef(null);

  const [attributeList, setAttributeList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [setsList, setSetsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [subTypesList, setSubTypesList] = useState([]);
  const [builtForm, setBuiltForm] = useState({});

  useEffect(() => {
    const allFiltersPromise = fetchFilters();
    allFiltersPromise.then( filterResponses => {
      console.group('%cfilterResponses', 'color: yellow; background-color: green; font-weight: bold');
      console.log(filterResponses);
      filterResponses.forEach(filterResponse => {
        console.log(filterResponse);
        if (!filterResponse?.data || !Object.keys(filterResponse.data)) {
          return;
        }
        const filter = Object.keys(filterResponse.data).filter(key => !/^_/.test(key))?.[0];
        filterResponse.data[filter].sort(filter === 'sets' ? setSort : undefined);
        switch (filter) {
          case 'attributes':
            console.log('1) attributes:', filterResponse.data.attributes);
            setAttributeList(filterResponse.data.attributes.map(value => {
              return { name: value, value };
            }));
            console.log('2) attributeList:', JSON.parse(JSON.stringify(attributeList)));
            break;
          case 'keywords':
            console.log('1) keywords:', filterResponse.data.keywords);
            setKeywordsList(filterResponse.data.keywords.map(value => {
              return { name: value, value };
            }));
            console.log('2) keywordsList:', keywordsList);
            break;
          case 'sets':
            console.log('1) sets:', JSON.parse(JSON.stringify(filterResponse.data.sets)));
            console.log('2) sets:', JSON.parse(JSON.stringify(filterResponse.data.sets)));
            setSetsList(filterResponse.data.sets.map(setObj => {
              console.log(JSON.parse(JSON.stringify(setObj)));
              return { name: setObj.name, value: setObj.id };
            }));
            console.log('3) ******* setsList:', setsList);
            break;
          case 'types':
            console.log('1) types:', filterResponse.data.types);
            setTypesList(filterResponse.data.types.map(value => {
              return { name: value, value };
            }));
            console.log('2) typesList:', typesList);
            break;
          case 'subtypes':
            console.log('1) subTypes:', filterResponse.data.subtypes);
            setSubTypesList(filterResponse.data.subtypes.map(value => {
              return { name: value, value };
            }));
            console.log('2) subTypesList:', subTypesList);
            break;
          default:
        }
      });
      console.log('end of filters');
      console.groupEnd();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log('here createSelectOptions ');
    console.log(filterName, filter);
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
    console.group('handleOnChange');
    if (!inputName) {
      console.log('early exit');
      console.groupEnd();
      return;
    }
    let value;
    if (inputTarget.type === 'checkbox') {
      value = inputTarget.checked ? 'true' : '';
    } else {
      value = inputTarget?.value.trim();
    }
    console.log(`type: ${inputTarget.type}`);
    console.log(`name: ${inputName}`);
    console.log(`value: ${value}`);
    if (value) {
      setBuiltForm(Object.assign({}, builtForm, { [inputName] : value }));
    } else {
      // Disabling linter due to needing a throwaway variable to remov
      const { [inputName]: throwAwayVar, ...removeValueForm} = builtForm;    // eslint-disable no-unused-vars
      console.log(`********** removeValueForm`, JSON.parse(JSON.stringify(removeValueForm)));
      setBuiltForm(removeValueForm);
    }
    console.groupEnd();
  };

  const submitHandler = (e) => {
    e.preventDefault();
/*    const builtForm = {};
    Array.from(formRef.current.querySelectorAll('input[name], select[name]')).forEach(input => {
      const isCheckbox = input.type === 'checkbox';
      const trimmedValue = input?.value?.trim();
      if (isCheckbox || trimmedValue) {
        builtForm[input.getAttribute('name')] = isCheckbox ? input.checked : trimmedValue;
      }
    });*/
    filterSubmit(builtForm);
  };

  return (<aside className={`filter-container ${filterVisibilityToggle}` }>
      <section>
        <h2>Filters Cards</h2>
        <form onSubmit={ submitHandler } ref={ formRef }>
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
        <fieldset>
          <legend>builtForm</legend>
          { Object.keys(builtForm).map(k => {
            return (<div key={`o-${k}`}>
              <b>{k}:</b> {builtForm[k]}
            </div>);
          })}
        </fieldset>
      </section>
    </aside>
  );
};

Filters.propTypes = {
  filterSubmit: PropTypes.func.isRequired,
  filterVisibilityToggle: PropTypes.string.isRequired
};

export default Filters;