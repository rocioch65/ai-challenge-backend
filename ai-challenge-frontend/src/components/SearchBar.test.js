import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    test('renderiza el input y el botón de búsqueda', () => {
        render(<SearchBar onSearch={jest.fn()} />);
        expect(screen.getByPlaceholderText(/buscar productos/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('muestra un mensaje de error si se envía vacío', () => {
        render(<SearchBar onSearch={jest.fn()} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText(/por favor ingresa un término de búsqueda/i)).toBeInTheDocument();
    });

    test('llama a onSearch con el texto ingresado', async () => {
        const mockSearch = jest.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByPlaceholderText(/buscar productos/i);
        await userEvent.type(input, 'celular');

        fireEvent.click(screen.getByRole('button'));

        expect(mockSearch).toHaveBeenCalledWith('celular');
    });


    test('elimina el mensaje de error cuando se ingresa texto', () => {
        render(<SearchBar onSearch={jest.fn()} />);
        const input = screen.getByPlaceholderText(/buscar productos/i);

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText(/por favor ingresa/i)).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'televisor' } });
        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByText(/por favor ingresa/i)).not.toBeInTheDocument();
    });
});
