import { render, screen } from '@testing-library/react';
import React from 'react';
import Pagination from './index';

test('Should render Pagination component', () => {
  render(<Pagination currentPageIndex={0} rowsPerPage={5} setCurrentPageIndex={function (): void {
    throw new Error('Function not implemented.');
  }} setRowsPerPage={function (): void {
    throw new Error('Function not implemented.');
  }} totalCount={100} />);

  const linkElement = screen.getByText(/4/i);
  expect(linkElement).toBeInTheDocument();
});
