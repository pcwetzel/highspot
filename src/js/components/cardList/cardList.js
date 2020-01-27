import React from 'react';
import Card from '../card';
import './cardList.scss';
import PropTypes from 'prop-types';


const CardList = (props) => {
  const { cards } = props;

  return (
    <section className='card-list'>
      <h2 className='screen-reader-only'>List of Cards</h2>
      { !cards && <div className='error no-cards'>No Cards Found</div> }
      { cards && <ul>
      { cards.map((card, index) => {
          return (<li key={`${card?.id}_${index}`}>
            <Card {...card} />
          </li>);
        }) }
      </ul> }
    </section>
  );
};

CardList.propTypes = {
  cards: PropTypes.array
};

export default CardList;