import React from 'react';
import { render } from '../testUtils';
import { Home } from '../../pages/index';
import { describe, it, expect } from '@jest/globals';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
