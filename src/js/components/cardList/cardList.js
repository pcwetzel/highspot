import React from 'react';
import Card from '../card/card';
import './cardList.scss';


const CardList = (props) => {
  const { cards } = props;
  return (
    <section className='card-list'>
      <h2 className='screen-reader-only'>Card List</h2>
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
/*

  const { imageUrl, name, text, set, type } = props;
  return (
    <section className="card">
      <div className='card-front'>
        { imageUrl && <div className='image'><img src={ imageUrl } alt='' /></div>}
        <dl>
          { name && <div><dt>Name:</dt><dd>{ name }</dd></div> }
          { text && <div><dt>Text:</dt><dd>{ text }</dd></div> }
          { set?.name && <div><dt>Set Name:</dt><dd>{ set.name }</dd></div> }
          { type && <div><dt>Type:</dt><dd>{ type }</dd></div> }
        </dl>
      </div>
    </section>
  )
*/
};

export default CardList;