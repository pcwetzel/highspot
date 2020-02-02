import React from "react";
import PropTypes from "prop-types";

import './cardCount.scss';

const CardCount = (props) => {
  const { totalCards } = props;

  return (
    <section className='card-total'>
      <span className='small-only'>{ totalCards.toLocaleString() } { totalCards === 1 ? 'card' : 'cards' } found</span>
      <span className='medium-and-bigger'>{ totalCards.toLocaleString() } { totalCards === 1 ? 'card' : 'cards' }</span>
    </section>
  );
};

CardCount.propTypes = {
  totalCards: PropTypes.number.isRequired
};


export default CardCount;
