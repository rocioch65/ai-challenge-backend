import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detalle" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;