import React from 'react';
import './card.scss';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { imageUrl, name, text, set, type } = props;

  return (
    <section className="card">
      <div className='card-front'>
        { imageUrl && <div className='image'><img src={ imageUrl } alt='' /></div>}
        <dl>
          { name && <><dt>Name:</dt><dd>{ name }</dd></> }
          { text && <><dt>Text:</dt><dd>{ text }</dd></> }
          { set?.name && <><dt>Set Name:</dt><dd>{ set.name }</dd></> }
          { type && <><dt>Type:</dt><dd>{ type }</dd></> }
        </dl>
      </div>
    </section>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  set: PropTypes.object,
  type: PropTypes.string
};

export default Card;