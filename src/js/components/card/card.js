import React from 'react';
import './card.scss';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { imageUrl, name, text, set, subtypes, type, rarity, cost, power, health, 
    soulSummon, soulTrap, attributes, collectible, unique } = props;

  return (
    <section className='card'>
      { name && <h3>{ name }</h3> }
      <div className='card-front'>
        { imageUrl && <div className='image'><img src={ imageUrl } alt='' /></div>}
        <dl>
          { name && <><dt>Name:</dt><dd>{ name }</dd></> }
          { cost && <><dt>cost:</dt><dd>{ cost }</dd></> }
          { power && <><dt>power:</dt><dd>{ power }</dd></> }
          { health && <><dt>health:</dt><dd>{ health }</dd></> }
          { soulSummon && <><dt>soulSummon:</dt><dd>{ soulSummon }</dd></> }
          { soulTrap && <><dt>soulTrap:</dt><dd>{ soulTrap }</dd></> }
          { attributes && <><dt>attributes:</dt><dd>{ attributes }</dd></> }
          { collectible && <><dt>collectible:</dt><dd>{ collectible }</dd></> }
          { unique && <><dt>unique:</dt><dd>{ unique }</dd></> }
        </dl>
      </div>
      <div className='card-back'>
          <dl>
              { set?.name && <><dt>Set Name:</dt><dd>{ set.name }</dd></> }
              { type && <><dt>Type:</dt><dd>{ type }</dd></> }
              { subtypes && <><dt>Sub Types:</dt><dd>{ subtypes.join(', ') }</dd></> }
              { rarity && <><dt>Rarity:</dt><dd>{ rarity }</dd></> }
              { text && <><dt>Text:</dt><dd>{ text }</dd></> }
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