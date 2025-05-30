import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemDetail from './ItemDetail';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockItem = {
    title: 'Camiseta React',
    description: 'Camiseta de algodón con logo de React',
    price: 45000,
    seller: { name: 'Juan Pérez', rating: 4.5 },
    stock: 3,
    images: [
        'https://via.placeholder.com/300?text=1',
        'https://via.placeholder.com/300?text=2'
    ]
};

beforeEach(() => {
    localStorage.setItem('selectedItem', JSON.stringify(mockItem));
});

afterEach(() => {
    localStorage.clear();
});
test('muestra mensaje si no hay información del producto', () => {
    localStorage.removeItem('selectedItem');

    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    expect(screen.getByText(/No se encontró información del producto/i)).toBeInTheDocument();
});

test('muestra los detalles del producto', () => {
    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    expect(screen.getByText(/Camiseta React/i)).toBeInTheDocument();
    expect(screen.getByText(/Camiseta de algodón/i)).toBeInTheDocument();
    expect(screen.getByText(/45.000/)).toBeInTheDocument();
    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText(/¡Quedan pocas unidades!/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /imagen principal/i })).toBeInTheDocument();
});

test('muestra mensaje cuando no hay información del producto en localStorage', () => {

    localStorage.removeItem('selectedItem');

    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    expect(screen.getByText(/no se encontró información del producto/i)).toBeInTheDocument();
});

test('al hacer clic en una miniatura cambia la imagen principal', async () => {
    localStorage.setItem('selectedItem', JSON.stringify(mockItem));

    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    const thumbnail = screen.getByAltText(/Miniatura 1/);
    await userEvent.click(thumbnail);

    const newMainImage = screen.getByAltText(/Imagen principal/i);
    expect(newMainImage).toHaveAttribute('src', mockItem.images[1]);
});

test('muestra mensaje si no hay item seleccionado en localStorage', () => {
    localStorage.removeItem('selectedItem');

    render(
        <MemoryRouter>
            <ItemDetail />
        </MemoryRouter>
    );

    expect(screen.getByText(/no se encontró información del producto/i)).toBeInTheDocument();
});

