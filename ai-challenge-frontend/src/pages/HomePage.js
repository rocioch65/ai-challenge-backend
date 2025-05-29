import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ItemCard from '../components/ItemCard';
import EmptyResultMessage from '../components/EmptyResultMessage';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem('lastSearchResults');
    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedResults && savedTerm) {
      setItems(JSON.parse(savedResults));
    }
  }, []);

  const handleSearch = async (query) => {
    localStorage.removeItem('lastSearchResults');
    localStorage.removeItem('lastSearchTerm');
    setLoading(true);
    setError('');
    setNotFound(false);
    setItems([]);

    try {
      const response = await fetch(`/api/items?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === 'ITEM_NOT_FOUND') {
          setNotFound(true);
        } else {
          throw new Error(errorData.message || 'Error inesperado');
        }
      } else {
        const data = await response.json();
        setItems(data);
        localStorage.setItem('lastSearchResults', JSON.stringify(data));
        localStorage.setItem('lastSearchTerm', query);
      }
    } catch (e) {
      setError(e.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header onSearch={handleSearch} />

      <div className="max-w-4xl mx-auto">
        {/* Mensajes de estado */}
        {loading && (
          <p className="text-center text-gray-600 text-lg mb-4">Cargando...</p>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">
            Error: {error}
          </p>
        )}

        {notFound && <EmptyResultMessage />}

        {/* Resultados */}
        {items.length > 0 && (
          <div className="space-y-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;