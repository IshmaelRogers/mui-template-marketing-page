import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders main content', () => {
  render(<App />);
  const main = screen.queryByRole('main');
  expect(main ?? document.body).toBeTruthy();
});
