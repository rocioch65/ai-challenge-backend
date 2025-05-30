import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout component', () => {
  test('renderiza correctamente los children', () => {
    render(
      <Layout>
        <p>Contenido de prueba</p>
      </Layout>
    );

    expect(screen.getByText(/contenido de prueba/i)).toBeInTheDocument();
  });

  test('aplica clases de Tailwind correctamente', () => {
    const { container } = render(
      <Layout>
        <div>Otro contenido</div>
      </Layout>
    );

    expect(container.firstChild).toHaveClass('min-h-screen');
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });
});
