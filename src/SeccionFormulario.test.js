import { render, screen } from '@testing-library/react';
import SeccionFormulario from './SeccionFormulario';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
