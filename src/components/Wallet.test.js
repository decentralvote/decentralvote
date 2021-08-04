import { render, screen, fireEvent } from '@testing-library/react';
import Wallet from './Wallet';
import { mockConnector, mockWeb3React } from '../helpers/TestHelpers';

test('renders a button with default connect label', () => {
  let connector = mockConnector();
  let mockW3r = mockWeb3React;
  render(<Wallet connector={connector} w3r={mockW3r} />);
  const walletButtonElement = screen.getByText('Connect Wallet');
  expect(walletButtonElement).toBeInTheDocument();
});

test('renders wallet address and button with disconnect label', () => {
  let connector = mockConnector();
  let mockW3r = mockWeb3React({active: true});
  render(<Wallet connector={connector} w3r={mockW3r} />);
  const walletButtonElement = screen.getByText('Disconnect');
  expect(walletButtonElement).toBeInTheDocument();
  const walletAddressElement = screen.getByText('0x19...2c33');
  expect(walletAddressElement).toBeInTheDocument();
});
