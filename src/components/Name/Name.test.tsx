import { render, screen } from '@testing-library/react';
import React from 'react';
import Name from './index';

test('Should render Name component', () => {
  render(<Name id={'1'} name={'Aaron Miles'} />);

  const linkElement = screen.getByText(/AM/i);
  expect(linkElement).toBeInTheDocument();
});
