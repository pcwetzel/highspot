import React from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import * as VALUES from '../../constants/value-constants';

const Card = (props) => {
  const { imageUrl, name, text, set, subtypes, type, rarity, cost, power, health, 
    soulSummon, soulTrap, attributes, collectible, unique } = props;

  const graphSize = {};
  Object.keys(VALUES).forEach(graph => {
    graphSize[graph] = [graph] && VALUES[graph]?.max && Math.round(100 * [graph] / VALUES[graph].max);
  });

  return (
    <section className='card'>
      { name && <h3>{ name }</h3> }
      <div className='card-front'>
        { imageUrl && <div className='image'><img src={ imageUrl } alt='' /></div>}
        <dl>
          { set?.name && <><dt>Set Name:</dt><dd>{ set.name }</dd></> }
          { type && <><dt>Type:</dt><dd>{ type }</dd></> }
          { subtypes && <><dt>Sub Types:</dt><dd>{ subtypes.join(', ') }</dd></> }
          { rarity && <><dt>Rarity:</dt><dd>{ rarity }</dd></> }
          { text && <><dt>Text:</dt><dd>{ text }</dd></> }
        </dl>
      </div>
      <div className='card-back'>
        <dl>
          { cost && <><dt>Cost:</dt><dd>
            { graphSize?.['cost'] && <div className='graph cost' data-graph-size={graphSize[cost]} /> }
            <div>{ cost }</div></dd></> }
          { power && <><dt>Power:</dt><dd>{ power }</dd></> }
          { health && <><dt>Health:</dt><dd>{ health }</dd></> }
          { soulSummon && <><dt>Soul Summon:</dt><dd>{ soulSummon }</dd></> }
          { soulTrap && <><dt>Soul Trap:</dt><dd>{ soulTrap }</dd></> }
          { attributes && <><dt>Attributes:</dt><dd>{ attributes }</dd></> }
          <dt>Collectible:</dt><dd>{ collectible && <span className='checkmark' /> }</dd>
          <dt>Unique:</dt><dd>{ unique && <span className='checkmark' /> }</dd>
        </dl>
      </div>
      <button className='cta'>
        <div>More Details</div>
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