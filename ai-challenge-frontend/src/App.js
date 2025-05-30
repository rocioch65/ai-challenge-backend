// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemDetail from './pages/ItemDetail';

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detalle" element={<ItemDetail />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;