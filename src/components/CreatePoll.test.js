import { render, screen, fireEvent } from '@testing-library/react';
import PollLookup from './PollLookup';
import { act } from 'react-dom/test-utils';
import { mockWeb3React } from '../helpers/TestHelpers';
import { ethers } from 'ethers';

const setPollInstance = jest.fn();
const handleNext = jest.fn();
const buttonTestId = 'step-one-button';

test('renders a label and input', () => {
  render(<PollLookup w3r={mockWeb3React()} />);
  const labelElement = screen.getByLabelText('Please connect a wallet *');
  expect(labelElement).toBeInTheDocument();
});
