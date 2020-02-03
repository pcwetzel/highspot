import { fetchCards, fetchFilters } from "./apiLoader";

describe('API Testing', function () {

  test('Basic Card retrival should only be 20 cards', async () => {
    const cardsObj = await fetchCards();
    expect(cardsObj.cards.length).toBe(20);
    expect(cardsObj.loading).toBe(false);
    expect(cardsObj.error).toBe(null);
  });

  test('Test out extra parameters and make sure at least some cards come back', async () => {
    const params = {
      cost: 2,
      collectible: true,
      page: 2
    };
    const cardsObj = await fetchCards(params);
    expect(cardsObj.cards.length).toBeTruthy();
    expect(cardsObj.loading).toBe(false);
    expect(cardsObj.error).toBe(null);
  });

  test('All filter lookups should come back', async () => {
    const filtersObj = await fetchFilters();
    expect(filtersObj.length).toBe(5);
    expect(filtersObj.filter(filter => filter.loading).length).toBe(0);
    expect(filtersObj.filter(filter => filter.error).length).toBe(0);
  });
});
