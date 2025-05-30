// src/components/ItemCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard';

// Mock de useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    localStorage.clear();
});

const mockItem = {
    id: '1',
    title: 'Laptop Gaming',
    price: 1200,
    seller: {
        name: 'GamerStore',
        rating: 4.3,
    },
    images: ['https://example.com/laptop.jpg'],
};

describe('ItemCard', () => {
    test('renderiza correctamente con imagen y rating', () => {
        render(
            <MemoryRouter>
                <ItemCard item={mockItem} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Laptop Gaming/i)).toBeInTheDocument();
        expect(screen.getByText(/GamerStore/i)).toBeInTheDocument();
        expect(screen.getByText(/\$1200/)).toBeInTheDocument();
        expect(screen.getByAltText(/Laptop Gaming/i)).toHaveAttribute('src', mockItem.images[0]);
        expect(screen.getByText(/FULL/i)).toBeInTheDocument();
    });

    test('navega al hacer click y guarda en localStorage', () => {
        render(
            <MemoryRouter>
                <ItemCard item={mockItem} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Laptop Gaming/i));

        const savedItem = JSON.parse(localStorage.getItem('selectedItem'));
        expect(savedItem.title).toBe('Laptop Gaming');
        expect(mockNavigate).toHaveBeenCalledWith('/detalle');
    });

    test('muestra "Envío gratis" si precio es mayor o igual a 100', () => {
        const cheapItem = { ...mockItem, price: 50 };
        render(
            <MemoryRouter>
                <ItemCard item={cheapItem} />
            </MemoryRouter>
        );

        expect(
            screen.getByText((content, element) =>
                element?.textContent === 'Envío gratis'
            )
        ).toBeInTheDocument();

    });

    test('no muestra imagen si item.images es undefined', () => {
        const noImageItem = { ...mockItem, images: undefined };
        render(
            <MemoryRouter>
                <ItemCard item={noImageItem} />
            </MemoryRouter>
        );

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    test('aplica clase especial si isFirst es true', () => {
        const { container } = render(
            <MemoryRouter>
                <ItemCard item={mockItem} isFirst />
            </MemoryRouter>
        );

        expect(container.firstChild).toHaveClass('mt-6');
    });
});
