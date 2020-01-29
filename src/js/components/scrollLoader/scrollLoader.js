import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";

const ScrollLoader = (props) => {
  const { cardDataLoading, loadNextPage } = props;
  const scrollElement = useRef(null);

  const observerOptions = {
    rootMargin: '0px',
    threshold: 0.2
  };

  const bottomOfPageObserver = new IntersectionObserver(entries => {
    const loadMoreEntry = entries.filter(entry => entry.target === scrollElement.current)?.[0];
    if (loadMoreEntry?.isIntersecting && !cardDataLoading) {
      loadNextPage();
    }
  }, observerOptions);

  useEffect(() => {
    const scrollElementDOM = scrollElement.current;
    bottomOfPageObserver.observe(scrollElementDOM);

    return () => { return bottomOfPageObserver.unobserve(scrollElementDOM); };
  });

  return (<section ref={scrollElement}>
    { !cardDataLoading && <div className='scroll-indicator'>Scroll Down for more cards</div> }
  </section>);
};

ScrollLoader.propTypes = {
  cardDataLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired
};

export default ScrollLoader;