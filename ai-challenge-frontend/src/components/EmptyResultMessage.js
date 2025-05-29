import React from 'react';

const EmptyResultMessage = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-100 w-full max-w-xl text-center">
        <img
          src="https://http2.mlstatic.com/frontend-assets/search-nordic/not-found.svg"
          alt="No results"
          className="w-20 mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold">
          No hay publicaciones que coincidan con tu búsqueda.
        </h2>
        <ul className="text-left mt-4 text-sm space-y-1">
          <li>• Revisa la ortografía de la palabra.</li>
          <li>• Utiliza palabras más genéricas o menos palabras.</li>
          <li>
            •{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Navega por las categorías
            </a>{' '}
            para encontrar un producto similar.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyResultMessage;