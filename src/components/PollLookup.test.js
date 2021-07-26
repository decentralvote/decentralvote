import { render, screen, fireEvent } from '@testing-library/react';
import PollLookup from './PollLookup';

const setPollAddress = jest.fn();

test('renders a label and input', () => {
  render(<PollLookup />);
  const labelElement = screen.getByLabelText('Set Poll Address *');
  expect(labelElement).toBeInTheDocument();
});

test('lifts state up to parent', () => {
  render(<PollLookup onLookup={setPollAddress} />);
  let testValue = 'abc123';
  let inputElement = screen.getByLabelText('Set Poll Address *');
  fireEvent.change(inputElement, {target: {value: testValue}});
  expect(inputElement.value).toBe(testValue);
  expect(setPollAddress).toBeCalledTimes(1);
  expect(setPollAddress).toHaveBeenCalledWith(testValue);
});
