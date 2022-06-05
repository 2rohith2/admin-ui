import { render } from '@testing-library/react';
import React from 'react';
import Loader from './index';

test('Should render Loader component', () => {
  render(<Loader />);
});
