
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemDetail from './ItemDetail';
import { MemoryRouter } from 'react-router-dom';


const mockItem = {
    title: 'Camiseta React',
    description: 'Camiseta de algodón con logo de React',
    price: 45000,
    seller: { name: 'Juan Pérez', rating: 4.5 },
    stock: 3,
    images: [
        'https://via.placeholder.com/300?text=1',
        'https://via.placeholder.com/300?text=2'
    ],
    paymentMethods: ['Tarjeta de crédito', 'PSE', 'Efectivo']
};

beforeEach(() => {
    localStorage.setItem('selectedItem', JSON.stringify(mockItem));
});

afterEach(() => {
    localStorage.clear();
});

describe('ItemDetail', () => {
    test('muestra mensaje si no hay información del producto', () => {
        localStorage.removeItem('selectedItem');
        render(<MemoryRouter><ItemDetail /></MemoryRouter>);
        expect(screen.getByText(/no se encontró información del producto/i)).toBeInTheDocument();
    });

    test('muestra los detalles del producto', () => {
        render(<MemoryRouter><ItemDetail /></MemoryRouter>);
        expect(screen.getByText(/Camiseta React/i)).toBeInTheDocument();
        expect(screen.getByText(/Camiseta de algodón/i)).toBeInTheDocument();
        expect(screen.getByText(/\$\s*45\.000/)).toBeInTheDocument();
        expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
        expect(screen.getByText('(4.5)')).toBeInTheDocument();
        expect(screen.getByText(/¡Quedan pocas unidades!/)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /imagen principal/i })).toBeInTheDocument();
        expect(screen.getByText(/Tarjeta de crédito/i)).toBeInTheDocument();
        expect(screen.getByText(/PSE/i)).toBeInTheDocument();
        expect(screen.getByText(/Efectivo/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeDisabled();
        expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument();
    });

    test('cambia la imagen principal al hacer clic en una miniatura', async () => {
        render(<MemoryRouter><ItemDetail /></MemoryRouter>);
        const thumbnails = screen.getAllByRole('img', { name: /Miniatura/i });
        fireEvent.click(thumbnails[1]);
        const mainImage = screen.getByAltText(/imagen principal/i);
        expect(mainImage).toHaveAttribute('src', mockItem.images[1]);
    });
});
