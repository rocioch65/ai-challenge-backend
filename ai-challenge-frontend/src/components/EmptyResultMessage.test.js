import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyResultMessage from './EmptyResultMessage';

describe('EmptyResultMessage', () => {
    test('debe renderizar correctamente el mensaje principal', () => {
        render(<EmptyResultMessage />);

        const heading = screen.getByText(/no hay publicaciones que coincidan/i);
        expect(heading).toBeInTheDocument();
    });

    test('debe mostrar todas las sugerencias', () => {
        render(<EmptyResultMessage />);

        expect(screen.getByText(/Revisa la ortografía/i)).toBeInTheDocument();
        expect(screen.getByText(/Utiliza palabras más genéricas/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /navega por las categorías/i })).toBeInTheDocument();
    });

    test('debe mostrar la imagen de "no results"', () => {
        render(<EmptyResultMessage />);
        const img = screen.getByAltText(/no results/i);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', expect.stringContaining('not-found.svg'));
    });
});
