import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/decentralvote/i, {selector: 'a'});
  expect(linkElement).toBeInTheDocument();
});
