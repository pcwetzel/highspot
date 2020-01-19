import React from 'react';
import './card.scss';

const Card = (props) => {
  const { image, name, text, set, type } = props;
  return (
    <section>
      <div className='card-front'>
      { image && <div className='image'><img src={image} alt={ name } /></div>}
      <dl>
        { name && <div><dt>Name:</dt><dd>{ name }</dd></div> }
        { text && <div><dt>Text:</dt><dd>{ text }</dd></div> }
        { set?.name && <div><dt>Set Name:</dt><dd>{ set.name }</dd></div> }
        { type && <div><dt>Type:</dt><dd>{ type }</dd></div> }
      </dl>
      </div>
    </section>
  )
};

export default Card;