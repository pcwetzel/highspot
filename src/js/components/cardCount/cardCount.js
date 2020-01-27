import React from "react";
import PropTypes from "prop-types";

import './cardCount.scss';

const CardCount = (props) => {
  const { totalCards } = props;

  return (
    <section className='card-total'>{ totalCards.toLocaleString() } { totalCards === 1 ? 'card' : 'cards' } found</section>
  );
};

CardCount.propTypes = {
  totalCards: PropTypes.number.isRequired
};


export default CardCount;
