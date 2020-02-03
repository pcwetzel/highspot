import React from 'react';
import { render } from '@testing-library/react';
import Checkmark from "./checkmark";

const GENERIC_TITLE = 'Some Title';
const NON_CHECKED_TEXT = '-';

function getTestAttributes(queryByTitle, queryByLabelText, queryByText, data = {}) {
  const svgTitle = queryByTitle(data.title || GENERIC_TITLE);
  const ariaText = queryByLabelText(data.label || `not ${GENERIC_TITLE}`);
  const nonCheckedText = queryByText(data.text || NON_CHECKED_TEXT);

  return { svgTitle, ariaText, nonCheckedText };
}

describe('Test Checkmark', function () {
  test('Checkmark should be Checked', () => {
    const {queryByTitle, queryByLabelText, queryByText} = render(<Checkmark title={GENERIC_TITLE} checked={true}/>);
    const {svgTitle, ariaText, nonCheckedText} = getTestAttributes(queryByTitle, queryByLabelText, queryByText);
    expect(svgTitle).toBeTruthy();
    expect(ariaText).toBeNull();
    expect(nonCheckedText).toBeNull();
  });

  test('Checkmark should not be Checked', () => {
    const {queryByTitle, queryByLabelText, queryByText} = render(<Checkmark title={GENERIC_TITLE} checked={false}/>);
    const {svgTitle, ariaText, nonCheckedText} = getTestAttributes(queryByTitle, queryByLabelText, queryByText);
    expect(svgTitle).toBeNull();
    expect(ariaText).toBeTruthy();
    expect(nonCheckedText).toBeTruthy();
  });

  test('Checkmark with No Parameters should be not checked', () => {
    const {queryByTitle, queryByLabelText, queryByText} = render(<Checkmark/>);
    const {svgTitle, ariaText, nonCheckedText} = getTestAttributes(queryByTitle, queryByLabelText, queryByText, { label: 'not checked' });
    expect(svgTitle).toBeNull();
    expect(ariaText).toBeTruthy();
    expect(nonCheckedText).toBeTruthy();
  });

  test('Checkmark with no title but checked', () => {
    const {queryByTitle, queryByLabelText, queryByText} = render(<Checkmark checked={true} />);
    const {svgTitle, ariaText, nonCheckedText} = getTestAttributes(queryByTitle, queryByLabelText, queryByText, { title: 'checked' });
    expect(svgTitle).toBeTruthy();
    expect(ariaText).toBeNull();
    expect(nonCheckedText).toBeNull();
  });
});