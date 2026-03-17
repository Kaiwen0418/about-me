import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage heading', () => {
  render(<App />);
  expect(screen.getByText(/Kaiwen/i)).toBeInTheDocument();
});
