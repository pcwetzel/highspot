import React from 'react';
import './card.scss';

const Card = () => {
  const { image, name, text, set, type } = this.props;
  return (
    <section>
      { image }
      <dl>
        { name && `<dt>Name:</dt><dd>${name}</dd>` }
        { text && `<dt>Text:</dt><dd>${text}</dd>` }
        { set && `<dt>Set:</dt><dd>${set}</dd>` }
        { type && `<dt>Type:</dt><dd>${type}</dd>` }
      </dl>
    </section>
  )
};

export default Card;