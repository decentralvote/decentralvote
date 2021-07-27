import { render, screen, fireEvent } from '@testing-library/react';
import PollLookup from './PollLookup';
import {wait} from "@testing-library/user-event/dist/utils";


const setPollInstance = jest.fn();
const handleNext = jest.fn();

test('renders a label and input', () => {
  render(<PollLookup />);
  const labelElement = screen.getByLabelText('Set Poll Address *');
  expect(labelElement).toBeInTheDocument();
});

test('next button calls handle next', () => {
  render(<PollLookup onLookup={setPollInstance} onNext={handleNext} />);
  let button = screen.getByText('Next');
  fireEvent.click(button);
  expect(handleNext).toBeCalledTimes(1);
});


test('sets poll address', () => {
  render(<PollLookup onLookup={setPollInstance} onNext={handleNext} />);
  let testValue = 'abc123';
  let inputElement = screen.getByLabelText('Set Poll Address *');
  fireEvent.change(inputElement, {target: {value: testValue}});
  expect(inputElement.value).toBe(testValue);
});

test('lifts state up to parent', async () => {
  window.ethereum = {request: function(){}};
  render(<PollLookup onLookup={setPollInstance} onNext={handleNext} />);

  let testValue = 'abc123';
  let inputElement = screen.getByLabelText('Set Poll Address *');
  let button = screen.getByText('Next');

  fireEvent.change(inputElement, {target: {value: testValue}});
  expect(inputElement.value).toBe(testValue);
  fireEvent.click(button);

  await wait(() => expect(setPollInstance).toBeCalledTimes(1));
  await wait(() => expect(setPollInstance).toHaveBeenCalledWith(testValue));
});

