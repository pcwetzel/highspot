import React, { useState } from 'react';
import { useUID } from 'react-uid';
import PropTypes from 'prop-types';
import Checkmark from './checkmark';
import * as VALUES from '../../constants/value-constants';

import './card.scss';

const Card = (props) => {
  const { imageUrl, name, text, set, subtypes, type, rarity, cost, power, health,
    soulSummon, soulTrap, attributes, collectible, unique } = props;
  const graphTypes = { cost, power, health };
  const graphSize = {};

  const [isCardBack, setIsCardBack] = useState(false);
  const uid = useUID();

  const buttonId = `card-button-${uid}`;
  const toggleLayerId = `card-layer-${uid}`;

  Object.keys(graphTypes).forEach(type => {
    const maxValue = VALUES?.[type.toUpperCase()]?.max;
    if (maxValue && graphTypes[type]) {
      graphSize[type] = maxValue  && Math.round(100 * graphTypes[type] / maxValue);
    }
  });

  const toggleCard = (e) => {
    e.preventDefault();
    setIsCardBack(!isCardBack);
  };

  const paintGraphRow = (category = null) => {
    const key = Object.keys(category)?.[0];
    if (!category || !key || isNaN(category[key])) {
      return null;
    }
    return (<>
      <dt>{ key.replace(/\b\w+/g, (w) => `${w.charAt(0).toUpperCase()}${w.slice(1).toLowerCase()}`) }: </dt>
      <dd>
        <div className={`graph ${key}`} data-graph-size={graphSize[key]} />
        { category[key] }
        { VALUES?.[key.toUpperCase()]?.max && <span className='maximum'>(Max: {VALUES[key.toUpperCase()].max})</span> }
      </dd>
      </>);

  };

  return (
    <section className={`card ${isCardBack ? 'flipped' : ''}`}>
      <div className="cardContainer">
        { name && <h3>{ name }</h3> }
        <div className='card-flip-outer'>
          <div className="card-flip-inner" id={ toggleLayerId } aria-labelledby={ buttonId }>
            <div className='card-front'>
              { imageUrl && <div className='image'><img src={ imageUrl } alt='' /></div>}
            </div>
            <div className='card-back'>
              <dl>
                { paintGraphRow({ cost }) }
                { paintGraphRow({ power }) }
                { paintGraphRow({ health }) }
                { soulSummon && <><dt>Soul Summon:</dt><dd>{ soulSummon.toLocaleString() }</dd></> }
                { soulTrap && <><dt>Soul Trap:</dt><dd>{ soulTrap.toLocaleString() }</dd></> }
                { attributes && <><dt>Attributes:</dt><dd>{ attributes }</dd></> }

                <dt>Collectible:</dt><dd><Checkmark checked={collectible} title='collectable' /></dd>
                <dt>Unique:</dt><dd><Checkmark checked={unique} title='unique' /></dd>
              </dl>
            </div>
          </div>
        </div>
        <dl>
          { set?.name && <><dt>Set Name:</dt><dd>{ set.name }</dd></> }
          { type && <><dt>Type:</dt><dd>{ type }</dd></> }
          { subtypes && <><dt>Sub Types:</dt><dd>{ subtypes.join(', ') }</dd></> }
          { rarity && <><dt>Rarity:</dt><dd>{ rarity }</dd></> }
          { text && <><dt>Text:</dt><dd>{ text }</dd></> }
        </dl>
      </div>
      <button className='cta'
              id={ buttonId }
              aria-controls={ toggleLayerId }
              aria-expanded={ isCardBack }
              onClick={(event) => { toggleCard(event); }}
            >
        <div>{ isCardBack ? 'Less' : 'More' } Details</div>
      </button>
    </section>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  set: PropTypes.object,
  type: PropTypes.string,
  subtypes: PropTypes.array,
  rarity: PropTypes.string,
  cost: PropTypes.number,
  power: PropTypes.number,
  health: PropTypes.number,
  soulSummon: PropTypes.number,
  soulTrap: PropTypes.number,
  attributes: PropTypes.array,
  collectible: PropTypes.bool,
  unique: PropTypes.bool
};

export default Card;