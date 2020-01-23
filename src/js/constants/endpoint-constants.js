const API_URL = 'https://api.elderscrollslegends.io/v1';

/* Endpoints for specific services */
const API_CARDS = `${API_URL}/cards`;             // Get cards (filtering by parameters specified below)
const API_SETS = `${API_URL}/sets`;               // Get all the possible set names (and other per set attributes)
const API_ATTRIBUTES = `${API_URL}/attributes`;   // Get all the possible card attribute values
const API_KEYWORDS = `${API_URL}/keywords`;       // Get all the possible card keyword values
const API_TYPES = `${API_URL}/types`;             // Get all the possible card types
const API_SUBTYPES = `${API_URL}/subtypes`;       // Get all the possible card subtypes

/* Get cards filtering parameters */
const API_PARAM_PAGE_SIZE = 'pageSize';
const API_PARAM_PAGE = 'page';
const API_PARAM_NAME = 'name';
const API_PARAM_RARITY = 'rarity';
const API_PARAM_TYPE = 'type';
const API_PARAM_SUBTYPES = 'subtypes';
const API_PARAM_COST = 'cost';
const API_PARAM_POWER = 'power';
const API_PARAM_HEALTH = 'health';
const API_PARAM_SET_ID = 'set.id';
const API_PARAM_SET_NAME = 'set.name';
const API_PARAM_SOULSUMMON = 'soulSummon';
const API_PARAM_SOULTRAP = 'soulTrap';
const API_PARAM_TEXT = 'text';
const API_PARAM_ATTRIBUTES = 'attributes';
const API_PARAM_KEYWORDS = 'keywords';
const API_PARAM_UNIQUE = 'unique';
const API_PARAM_ID = 'id';

/* Endpoint logical operators - certain filtering options allow for this */
const API_LOGICAL_AND = ',';
const API_LOGICAL_OR = '|';


export {
  API_URL,
  API_CARDS,
  API_SETS,
  API_ATTRIBUTES,
  API_KEYWORDS,
  API_TYPES,
  API_SUBTYPES,
  API_PARAM_PAGE_SIZE,
  API_PARAM_PAGE,
  API_PARAM_NAME,
  API_PARAM_RARITY,
  API_PARAM_TYPE,
  API_PARAM_SUBTYPES,
  API_PARAM_COST,
  API_PARAM_POWER,
  API_PARAM_HEALTH,
  API_PARAM_SET_ID,
  API_PARAM_SET_NAME,
  API_PARAM_SOULSUMMON,
  API_PARAM_SOULTRAP,
  API_PARAM_TEXT,
  API_PARAM_ATTRIBUTES,
  API_PARAM_KEYWORDS,
  API_PARAM_UNIQUE,
  API_PARAM_ID,
  API_LOGICAL_AND,
  API_LOGICAL_OR
};