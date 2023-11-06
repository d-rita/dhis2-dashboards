import { render, screen } from '@testing-library/react';
import Footer from '../footer';

test('renders footer', () => {
  render(<Footer />);
  const element = screen.getByText(/Hosted on Netlify/i);
  expect(element).toBeInTheDocument();
});
