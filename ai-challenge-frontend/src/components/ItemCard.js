import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { MdFlashOn } from 'react-icons/md';


const ItemCard = ({ item, isFirst = false }) => {
  const navigate = useNavigate();
  const image = item?.images?.[0];

  const handleClick = () => {
    localStorage.setItem('selectedItem', JSON.stringify(item));
    navigate('/detalle');
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-transform hover:scale-[1.01] ${isFirst ? 'mt-6' : 'mt-6'}`}
    >
      <div className="relative flex flex-col sm:flex-row gap-4 py-4 px-2 sm:px-0 max-w-4xl mx-auto transition-transform hover:scale-[1.01] hover:shadow-md bg-white">

        {/*favorito */}
        <div className="absolute top-5 right-8 text-blue-500">
          <FiHeart size={20} />
        </div>

        {/* Imagen */}
        {image && (
          <div className="w-full sm:w-40 flex-shrink-0">
            <img
              src={image}
              alt={item.title}
              className="w-full h-auto object-contain rounded"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col justify-between text-gray-800 w-full relative">
          {/* Rating*/}
          <div className="absolute top-14 right-60">
            <span className="text-blue-500 text-sm">
              {'★'.repeat(Math.round(item.seller.rating))}
              <span className="text-gray-500"> ({item.seller.rating})</span>
            </span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3">{item.title}</h2>
            <p className="text-sm mb-1">
              <span className="text-gray-400">Por  {item.seller.name}{' '}</span>
            </p>
            <p className="text-lg font-bold text-gray-900 mb-1">${item.price}</p>

            {item.price > 100 ? (
              <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                Enviado por <MdFlashOn size={14} className="text-green-600" />  FULL
              </div>
            ) : (
              <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                Envío <span className="font-bold">gratis</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;