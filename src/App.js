import React from 'react';
import './App.css';
import Card from './js/components/card/card'

const data = {
  name: "Legate Rikke",
  rarity: "Legendary",
  type: "Creature",
  subtypes: [
    "Nord"
  ],
  cost: 4,
  power: 3,
  health: 4,
  set: {
    id: "hos",
    name: "Heroes of Skyrim",
    _self: "https://api.elderscrollslegends.io/v1/sets/hos"
  },
  collectible: true,
  soulSummon: 1200,
  soulTrap: 400,
  text: "When you summon an Imperial, summon a 1/1 Imperial Grunt in the other lane.",
  attributes: [
    "Willpower"
  ],
  unique: true,
  imageUrl: "https://images.elderscrollslegends.io/hos/legate_rikke.png",
  id: "d6a7f917460de639b0493925f098bf82e9b31b83"
};

function App() {
  return (<>
    <Card {...data} />
  </>);
}

export default App;
