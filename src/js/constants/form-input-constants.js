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

export {
  lookupInputNames,
  nonLookupInputs,
  nonLookupCheckboxes
};