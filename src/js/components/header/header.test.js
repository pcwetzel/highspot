import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

const testFunc = () => true;

test('renders header title', () => {
  const { getByText } = render(<Header totalCards={0} showTotalCards={false} paintFilters={false} handleFilterSubmit={testFunc} />);
  const headerElement = getByText(/Elder Scrolls Legends Card Lookup/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the card count properly inside the header', () => {
  const { getByText } = render(<Header totalCards={1} showTotalCards={true} paintFilters={false} handleFilterSubmit={testFunc} />);
  const cardCountElement = getByText(/1 Card Found/i);
  expect(cardCountElement).toBeInTheDocument();
});


test('renders the filters properly inside the header', () => {
  const { getByText } = render(<Header totalCards={0} showTotalCards={false} paintFilters={true} handleFilterSubmit={testFunc} />);
  const filtersElement = getByText(/Filters Cards/i);
  expect(filtersElement).toBeInTheDocument();
});


test('renders the filters, title, and card count all inside the header', () => {
  const { getByText } = render(<Header totalCards={10} showTotalCards={true} paintFilters={true} handleFilterSubmit={testFunc} />);
  const headerElement = getByText(/Elder Scrolls Legends Card Lookup/i);
  const cardCountElement = getByText(/10 Cards Found/i);
  const filtersElement = getByText(/Filters Cards/i);
  expect(headerElement).toBeInTheDocument();
  expect(cardCountElement).toBeInTheDocument();
  expect(filtersElement).toBeInTheDocument();
});
