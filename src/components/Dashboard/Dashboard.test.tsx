import { render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from './index';

test('Should render Dashboard Component', () => {
  const users = [{
    'id': '1',
    'name': 'Aaron Miles',
    'email': 'aaron@mailinator.com',
    'role': 'member'
  }];

  render(<Dashboard isLoading={false} users={users} />);

  const linkElement = screen.getByText(/Aaron Miles/i);
  expect(linkElement).toBeInTheDocument();
});
