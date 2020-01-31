import React from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import Checkmark from './checkmark';
import * as VALUES from '../../constants/value-constants';

const Card = (props) => {
  const { imageUrl, name, text, set, subtypes, type, rarity, cost, power, health, 
    soulSummon, soulTrap, attributes, collectible, unique } = props;

  const graphSize = {};
  Object.keys(VALUES).forEach(graph => {
    console.log(graph);
    graphSize[graph] = [graph] && VALUES[graph]?.max && Math.round(100 * [graph] / VALUES[graph].max);
    console.log(`${[graph]} && ${VALUES[graph]?.max} && Math.round(100 * ${[graph]} / ${VALUES[graph].max})`);
  });
  console.log(graphSize);
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
          { power && <><dt>Power:</dt><dd>
            { graphSize?.['power'] && <div className='graph power' data-graph-size={graphSize[power]} /> }
            <div>{ power }</div></dd></> }
          { health && <><dt>Health:</dt><dd>
            { graphSize?.['health'] && <div className='graph health' data-graph-size={graphSize[health]} /> }
            <div>{ health }</div></dd></> }
          { soulSummon && <><dt>Soul Summon:</dt><dd>{ soulSummon.toLocaleString() }</dd></> }
          { soulTrap && <><dt>Soul Trap:</dt><dd>{ soulTrap.toLocaleString() }</dd></> }
          { attributes && <><dt>Attributes:</dt><dd>{ attributes }</dd></> }
          <dt>Collectible:</dt><dd><Checkmark checked={collectible} title={collectible ? 'yes' : 'no'} /></dd>
          <dt>Unique:</dt><dd><Checkmark checked={unique} title={unique ? 'yes' : 'no'} /></dd>
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