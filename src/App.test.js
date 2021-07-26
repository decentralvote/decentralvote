import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the top bar menu', () => {
  render(<App />);

  // DV link in copyright
  const linkElement = screen.getByText(/decentralvote/i, {selector: 'a'});
  expect(linkElement).toBeInTheDocument();

  // ensure wallet component is visible
  const walletElement = screen.getByText(/Connect Wallet/i);
  expect(walletElement).toBeInTheDocument();
});
