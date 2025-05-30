import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import React from 'react';

describe('HomePage', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: '1',
                    title: 'Producto A',
                    description: 'Descripción A',
                    price: 1000,
                    seller: { name: 'Vendedor A', rating: 4 },
                    stock: 5,
                    images: [],
                },
            ],
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('realiza una búsqueda exitosa y muestra los resultados', async () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/buscar productos/i);
        const button = screen.getByRole('button');

        await userEvent.type(input, 'Producto A');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Producto A/i)).toBeInTheDocument();
        });
    });

    it('muestra mensaje de "no encontrado" si ITEM_NOT_FOUND', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            json: async () => ({ code: 'ITEM_NOT_FOUND' }),
        });

        render(<MemoryRouter><HomePage /></MemoryRouter>);
        const input = screen.getByPlaceholderText(/buscar productos/i);
        const button = screen.getByRole('button');

        await userEvent.type(input, 'Producto X');
        await userEvent.click(button);

    });
    it('muestra error inesperado si fetch lanza excepción', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('fallo de red'));

        render(<MemoryRouter><HomePage /></MemoryRouter>);
        const input = screen.getByPlaceholderText(/buscar productos/i);
        const button = screen.getByRole('button');

        await userEvent.type(input, 'X');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/fallo de red/i)).toBeInTheDocument();
        });
    });

    it('carga resultados guardados del localStorage al iniciar', () => {
        localStorage.setItem('lastSearchResults', JSON.stringify([
            { id: '1', title: 'Guardado 1', description: '...', price: 500, seller: { name: 'A', rating: 5 }, stock: 10, images: [] },
            { id: '2', title: 'Guardado 2', description: '...', price: 600, seller: { name: 'B', rating: 4 }, stock: 5, images: [] }
        ]));
        localStorage.setItem('lastSearchTerm', 'Guardado');

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        const resultados = screen.getAllByText(/Guardado/i);
        expect(resultados.length).toBeGreaterThan(0);
    });

});

