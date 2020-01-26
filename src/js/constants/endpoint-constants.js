const URL = 'https://api.elderscrollslegends.io/v1';

const MAX_PAGE_SIZE = 20;

/* Endpoints for specific services */
const CARDS = `${URL}/cards`;                    // Get cards (filtering by parameters specified below)
const FILTER_ATTRIBUTES = `${URL}/attributes`;   // Get all the possible card attribute values
const FILTER_KEYWORDS = `${URL}/keywords`;       // Get all the possible card keyword values
const FILTER_SETS = `${URL}/sets`;               // Get all the possible set names (and other per set attributes)
const FILTER_SUBTYPES = `${URL}/subtypes`;       // Get all the possible card subtypes
const FILTER_TYPES = `${URL}/types`;             // Get all the possible card types

/* Get cards filtering parameters */
const PARAM_PAGE_SIZE = 'pageSize';
const PARAM_PAGE = 'page';
const PARAM_NAME = 'name';
const PARAM_RARITY = 'rarity';
const PARAM_TYPE = 'type';
const PARAM_SUBTYPES = 'subtypes';
const PARAM_COST = 'cost';
const PARAM_POWER = 'power';
const PARAM_HEALTH = 'health';
const PARAM_SET_ID = 'set.id';
const PARAM_SET_NAME = 'set.name';
const PARAM_SOULSUMMON = 'soulSummon';
const PARAM_SOULTRAP = 'soulTrap';
const PARAM_TEXT = 'text';
const PARAM_ATTRIBUTES = 'attributes';
const PARAM_KEYWORDS = 'keywords';
const PARAM_UNIQUE = 'unique';
const PARAM_ID = 'id';

/* Endpoint logical operators - certain filtering options allow for this */
const LOGICAL_AND = ',';
const LOGICAL_OR = '|';


export {
  MAX_PAGE_SIZE,
  CARDS,
  FILTER_SETS,
  FILTER_ATTRIBUTES,
  FILTER_KEYWORDS,
  FILTER_TYPES,
  FILTER_SUBTYPES,
  PARAM_PAGE_SIZE,
  PARAM_PAGE,
  PARAM_NAME,
  PARAM_RARITY,
  PARAM_TYPE,
  PARAM_SUBTYPES,
  PARAM_COST,
  PARAM_POWER,
  PARAM_HEALTH,
  PARAM_SET_ID,
  PARAM_SET_NAME,
  PARAM_SOULSUMMON,
  PARAM_SOULTRAP,
  PARAM_TEXT,
  PARAM_ATTRIBUTES,
  PARAM_KEYWORDS,
  PARAM_UNIQUE,
  PARAM_ID,
  LOGICAL_AND,
  LOGICAL_OR
};