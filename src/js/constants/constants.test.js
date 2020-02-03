import * as ENDPOINTS from './endpoint-constants';
import * as FORM_INPUTS from './form-input-constants';
import * as VALUES from './value-constants';


describe('Test Endpoints Constants', function () {
  const URL = 'https://api.elderscrollslegends.io/v1';
  
  test('Max Page Size should only be 20 cards', () => {
    expect(ENDPOINTS.MAX_PAGE_SIZE).toBe(20);
  });

  test(`Test CARDS to equal '${URL}/cards'`, () => {
    expect(ENDPOINTS.CARDS).toBe(`${URL}/cards`);
  });

  test(`Test FILTER_ATTRIBUTES to equal '${URL}/attributes'`, () => {
    expect(ENDPOINTS.FILTER_ATTRIBUTES).toBe(`${URL}/attributes`);
  });

  test(`Test FILTER_KEYWORDS to equal ''${URL}/keywords'`, () => {
    expect(ENDPOINTS.FILTER_KEYWORDS).toBe(`${URL}/keywords`);
  });

  test(`Test FILTER_SETS to equal '${URL}/sets'`, () => {
    expect(ENDPOINTS.FILTER_SETS).toBe(`${URL}/sets`);
  });

  test(`Test FILTER_SUBTYPES to equal ''${URL}/subtypes'`, () => {
    expect(ENDPOINTS.FILTER_SUBTYPES).toBe(`${URL}/subtypes`);
  });

  test(`Test FILTER_TYPES to equal '${URL}/types'`, () => {
    expect(ENDPOINTS.FILTER_TYPES).toBe(`${URL}/types`);
  });

  test(`Test PARAM_PAGE_SIZE to equal 'pageSize'`, () => {
    expect(ENDPOINTS.PARAM_PAGE_SIZE).toBe('pageSize');
  });

  test(`Test PARAM_PAGE to equal 'page'`, () => {
    expect(ENDPOINTS.PARAM_PAGE).toBe('page');
  });

  test(`Test PARAM_NAME to equal 'name'`, () => {
    expect(ENDPOINTS.PARAM_NAME).toBe('name');
  });

  test(`Test PARAM_RARITY to equal 'rarity'`, () => {
    expect(ENDPOINTS.PARAM_RARITY).toBe('rarity');
  });

  test(`Test PARAM_TYPE to equal 'type'`, () => {
    expect(ENDPOINTS.PARAM_TYPE).toBe('type');
  });

  test(`Test PARAM_SUBTYPES to equal 'subtypes'`, () => {
    expect(ENDPOINTS.PARAM_SUBTYPES).toBe('subtypes');
  });

  test(`Test PARAM_COST to equal 'cost'`, () => {
    expect(ENDPOINTS.PARAM_COST).toBe('cost');
  });

  test(`Test PARAM_POWER to equal 'power'`, () => {
    expect(ENDPOINTS.PARAM_POWER).toBe('power');
  });

  test(`Test PARAM_HEALTH to equal 'health'`, () => {
    expect(ENDPOINTS.PARAM_HEALTH).toBe('health');
  });

  test(`Test PARAM_SET_ID to equal 'set.id'`, () => {
    expect(ENDPOINTS.PARAM_SET_ID).toBe('set.id');
  });

  test(`Test PARAM_SET_NAME to equal 'set.name'`, () => {
    expect(ENDPOINTS.PARAM_SET_NAME).toBe('set.name');
  });

  test(`Test PARAM_SOULSUMMON to equal 'soulSummon'`, () => {
    expect(ENDPOINTS.PARAM_SOULSUMMON).toBe('soulSummon');
  });

  test(`Test PARAM_SOULTRAP to equal 'soulTrap'`, () => {
    expect(ENDPOINTS.PARAM_SOULTRAP).toBe('soulTrap');
  });

  test(`Test PARAM_TEXT to equal 'text'`, () => {
    expect(ENDPOINTS.PARAM_TEXT).toBe('text');
  });

  test(`Test PARAM_ATTRIBUTES to equal 'attributes'`, () => {
    expect(ENDPOINTS.PARAM_ATTRIBUTES).toBe('attributes');
  });

  test(`Test PARAM_KEYWORDS to equal 'keywords'`, () => {
    expect(ENDPOINTS.PARAM_KEYWORDS).toBe('keywords');
  });

  test(`Test PARAM_UNIQUE to equal 'unique'`, () => {
    expect(ENDPOINTS.PARAM_UNIQUE).toBe('unique');
  });

  test(`Test PARAM_ID to equal 'id'`, () => {
    expect(ENDPOINTS.PARAM_ID).toBe('id');
  });

  test(`Test LOGICAL_AND to equal ','`, () => {
    expect(ENDPOINTS.LOGICAL_AND).toBe(',');
  });

  test(`Test LOGICAL_OR to equal '|'`, () => {
    expect(ENDPOINTS.LOGICAL_OR).toBe('|');
  });
});

describe('Test Form Input Constants', function () {
  test('Test lookupInputNames', () => {
    expect(FORM_INPUTS.lookupInputNames.sets).toBe('set.id');
    expect(FORM_INPUTS.lookupInputNames.subTypes).toBe('subtypes');
    expect(FORM_INPUTS.lookupInputNames.types).toBe('type');
  });

  test('Test nonLookupInputs', () => {
    const namesObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'name');
    const rarityObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'rarity');
    const costObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'cost');
    const powerObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'power');
    const healthObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'health');
    const textObj = FORM_INPUTS.nonLookupInputs.filter(obj => obj.name === 'text');

    expect(namesObj).toHaveLength(1);
    expect(namesObj[0].type).toEqual('text');

    expect(rarityObj).toHaveLength(1);
    expect(rarityObj[0].type).toEqual('text');

    expect(costObj).toHaveLength(1);
    expect(costObj[0].type).toEqual('number');

    expect(powerObj).toHaveLength(1);
    expect(powerObj[0].type).toEqual('number');

    expect(healthObj).toHaveLength(1);
    expect(healthObj[0].type).toEqual('number');

    expect(textObj).toHaveLength(1);
    expect(textObj[0].type).toEqual('text');
    expect(textObj[0].label).toEqual('Rules');
  });

  test('nonLookupCheckboxes', () => {
    const uniqueObj = FORM_INPUTS.nonLookupCheckboxes.filter(obj => obj.name === 'unique');

    expect(uniqueObj).toHaveLength(1);
    expect(uniqueObj[0].type).toEqual('checkbox');
    expect(uniqueObj[0].label).toEqual('Unique Card');
  });

});


describe('Test Value Constants', function () {
  test('Test cost constant', () => {
    expect(VALUES.COST.min).toBe(1);
    expect(VALUES.COST.max).toBe(20);
    expect(VALUES.COST.increment).toBe(1);
  });

  test('Test power constant', () => {
    expect(VALUES.POWER.min).toBe(1);
    expect(VALUES.POWER.max).toBe(12);
    expect(VALUES.POWER.increment).toBe(1);
  });

  test('Test health constant', () => {
    expect(VALUES.HEALTH.min).toBe(1);
    expect(VALUES.HEALTH.max).toBe(12);
    expect(VALUES.HEALTH.increment).toBe(1);
  });

});