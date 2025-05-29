import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSearch(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mt-6 px-4 sm:px-0 space-y-2"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar productos por nombre o palabra clave"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full pl-4 pr-12 py-2 rounded border text-gray-800 transition focus:outline-none focus:ring-2
            ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-yellow-400'}
          `}
        />

        {/* Ícono dentro del input */}
        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <FiSearch size={18} />
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm ml-1">
          Por favor ingresa un término de búsqueda
        </p>
      )}
    </form>
  );
};

export default SearchBar;
