import React from "react";
import {render, fireEvent } from "@testing-library/react";
import Card from './card';

// TODO: Make the card test more robust. Look to see what is visible and how/if it renders with lack of values

const BASIC_CARD_DATA = {
                          name: "Reachman Shaman",
                          rarity: "Common",
                          type: "Creature",
                          subtypes: [
                            "Reachman"
                          ],
                          cost: 2,
                          power: 2,
                          health: 2,
                          set: {
                            id: "cs",
                            name: "Core Set",
                            _self: "https://api.elderscrollslegends.io/v1/sets/cs"
                          },
                          collectible: true,
                          soulSummon: 50,
                          soulTrap: 5,
                          text: "At the start of your turn, give another random friendly creature +1/+1.",
                          attributes: [
                            "Neutral"
                          ],
                          unique: false,
                          imageUrl: "https://images.elderscrollslegends.io/cs/reachman_shaman.png",
                          id: "15d9c10821d4033fb045ed2cb4599ac76288ac67"
                        };

test('Basic Card Layout', () => {
  const { getByText, getByTestId } = render(<Card {...BASIC_CARD_DATA} />);
  expect(getByTestId('card-name')).toBeTruthy();
  expect(getByText(/Set Name/i)).toBeInTheDocument();
});

test('Test Card Flip', async () => {
  const { getByText, findByText } = render(<Card {...BASIC_CARD_DATA} />);
  fireEvent.click(getByText('More Details'));
  const items = await findByText(/Attributes:/i);
  expect(items).toBeInTheDocument();
});
