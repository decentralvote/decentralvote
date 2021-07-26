import { render, screen, fireEvent } from '@testing-library/react';
import Wallet from './Wallet';

test('renders a button with default connect label', () => {
  render(<Wallet />);
  const walletButtonElement = screen.getByText('Connect Wallet');
  expect(walletButtonElement).toBeInTheDocument();
});
