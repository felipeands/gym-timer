import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GymTime logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/GymTime/i);
  expect(linkElement).toBeInTheDocument();
});
