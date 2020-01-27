import React from 'react';

import './header.scss';
import CardCount from "../cardCount";
import PropTypes from "prop-types";

const Header = (props) => {
  const { totalCards, showTotalCards } = props;


  return (
    <header>
      <div><button>Filters</button></div>
      <div><h1>Elder Scrolls Legends Card Lookup</h1></div>
      <div>
        { showTotalCards && <CardCount totalCards={ totalCards }/> }
      </div>
    </header>
  );
};

Header.propTypes = {
  totalCards: PropTypes.number,
  showTotalCards: PropTypes.bool
};

export default Header;