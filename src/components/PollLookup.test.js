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

test('next button is disabled by default', () => {
  render(<PollLookup w3r={mockWeb3React()} onLookup={setPollInstance} onNext={handleNext} />);
  let button = screen.getByTestId(buttonTestId);
  fireEvent.click(button);
  expect(button).toBeDisabled();
  expect(handleNext).toBeCalledTimes(0);
});

test('sets poll address', () => {
  let mockW3r = mockWeb3React({active:true});
  render(<PollLookup w3r={mockW3r} onLookup={setPollInstance} onNext={handleNext} />);
  let testValue = 'abc123';
  let inputElement = screen.getByLabelText('Set Poll Address *');
  expect(inputElement.value).toBe('');
  fireEvent.change(inputElement, {target: {value: testValue}});
  expect(inputElement.value).toBe(testValue);
});

test('lifts state up to parent', async () => {
  let mockW3r = mockWeb3React({
    active: true,
    library: ethers.getDefaultProvider()
  });
  let testValue = 'abc123';
  let fetchPoll = jest.fn().mockResolvedValue(true);

  act(() => {
    render(<PollLookup w3r={mockW3r} fetchPoll={fetchPoll} onLookup={setPollInstance} onNext={handleNext} />);
  });

  let inputElement = screen.getByLabelText('Set Poll Address *');
  let button = screen.getByTestId(buttonTestId);

  act(() => {
    fireEvent.change(inputElement, {target: {value: testValue}});
  });

  expect(inputElement.value).toBe(testValue);

  act(() => {
    fireEvent.click(button);
  });

  expect(fetchPoll).toBeCalledTimes(1);
});
