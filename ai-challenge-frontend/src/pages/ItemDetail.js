import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Layout from '../components/Layout';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedItem = localStorage.getItem('selectedItem');
    if (storedItem) {
      const parsed = JSON.parse(storedItem);
      setItem(parsed);
      setMainImage(parsed.images?.[0] || '');
    }
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/items?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      localStorage.setItem('lastSearchResults', JSON.stringify(data));
      localStorage.setItem('lastSearchTerm', query);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error buscando producto:', err);
    }
  };

  if (!item) {
    return (
      <Layout>
        <Header onSearch={handleSearch} />
        <div className="text-center mt-10 text-gray-600">
          <p>No se encontró información del producto.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header onSearch={handleSearch} />

      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-yellow-600">{item.title}</h2>
        <p className="text-gray-700 mb-4">{item.description}</p>

        {/* Imagen principal */}
        {mainImage && (
          <img
            src={mainImage}
            alt="Imagen principal"
            className="w-full max-h-[400px] object-contain border rounded mb-4"
          />
        )}

        {/* Miniaturas */}
        {item.images?.length > 1 && (
          <div className="flex gap-3 mb-6 overflow-x-auto">
            {item.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Miniatura ${i}`}
                onClick={() => setMainImage(img)}
                className={`h-20 w-20 cursor-pointer object-cover rounded border transition duration-200 ${img === mainImage ? 'border-yellow-500 ring-2 ring-yellow-400' : 'border-gray-300'
                  }`}
              />
            ))}
          </div>
        )}

        <div className="mb-6 space-y-1">
          <p className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
            }).format(item.price)}
          </p>

          <p>
            <strong>Vendedor:</strong> {item.seller.name}{' '}
            <span className="text-yellow-500">
              {'★'.repeat(Math.round(item.seller.rating))}{' '}
              <span className="text-gray-500">({item.seller.rating})</span>
            </span>
          </p>

          {item.stock > 10 ? (
            <p>
              <strong>Stock:</strong> Disponible ({item.stock} unidades)
            </p>
          ) : (
            <p className="text-red-600">
              <strong>¡Quedan pocas unidades!</strong> ({item.stock})
            </p>
          )}
        </div>

        <Link
          to="/"
          className="inline-block mt-4 text-yellow-600 hover:underline hover:text-yellow-700 transition"
        >
          ← Volver
        </Link>
      </div>
    </Layout>
  );
};

export default ItemDetail;