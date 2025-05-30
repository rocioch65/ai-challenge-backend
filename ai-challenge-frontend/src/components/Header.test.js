import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';


jest.mock('./SearchBar', () => ({ onSearch }) => (
    <div data-testid="search-bar">SearchBar Mock</div>
));

describe('Header', () => {
    test('se renderiza correctamente con la barra de búsqueda', () => {
        render(<Header onSearch={jest.fn()} />);

        const searchBar = screen.getByTestId('search-bar');
        expect(searchBar).toBeInTheDocument();
    });

    test('tiene los estilos de fondo amarillo y sombra', () => {
        render(<Header onSearch={jest.fn()} />);

        const headerElement = screen.getByRole('banner');
        expect(headerElement).toHaveClass('bg-yellow-300');
        expect(headerElement).toHaveClass('shadow-md');
    });
});