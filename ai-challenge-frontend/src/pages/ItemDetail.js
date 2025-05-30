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

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg p-6">
        {/* Sección izquierda: imagen y miniaturas */}
        <div>
          {mainImage && (
            <img
              src={mainImage}
              alt="Imagen principal"
              className="w-full max-h-[450px] object-contain border rounded mb-4"
            />
          )}

          {item.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
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
        </div>

        {/* Sección derecha: detalles */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{item.title}</h2>

            <p className="text-2xl font-bold text-green-600 mb-3">
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
              }).format(item.price)}
            </p>

            <p className="text-gray-600 mb-1">
              Por {item.seller.name}
            </p>
            <p className="text-blue-500 mb-2">
              {'★'.repeat(Math.round(item.seller.rating))}{' '}
              <span className="text-gray-500">({item.seller.rating})</span>
            </p>

            <div><p className="text-gray-500 font-bold mb-4">Lo que tienes que saber de este producto</p>
              <p className="text-gray-700 mb-4">{item.description}</p></div>
          </div>

          {/* Métodos de pago */}
          <div className="border-t pt-4">
            {item.stock > 10 ? (
              <p className="text-gray-700 mb-4">
                Stock Disponible ({item.stock} unidades)
              </p>
            ) : item.stock > 0 ? (
              <p className="text-red-600">
                <strong>¡Quedan pocas unidades!</strong> ({item.stock})
              </p>
            ) : (
              <p className="text-red-700 font-bold">Producto sin stock</p>
            )}
            <p className="text-sm text-gray-500 font-medium mb-1">Métodos de pago disponibles:</p>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {item.paymentMethods?.map((method, idx) => (
                <li key={idx}>{method}</li>
              ))}
            </ul>
          </div>

          {/* Botón Comprar */}
          <button
            className="mt-4 px-6 py-3 bg-blue-400 text-white font-semibold rounded shadow hover:bg-blue-500 transition disabled:opacity-50"
            disabled
          >
            Comprar ahora
          </button>

          <Link
            to="/"
            className="mt-2 text-sm text-yellow-600 hover:underline hover:text-blue-700 transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
