import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">Product Management</h1>
            <div className="space-x-4">
              <Link to="/" className="text-blue-500 hover:underline">Add Product</Link>
              <Link to="/products" className="text-blue-500 hover:underline">View Products</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<ProductForm fetchProducts={fetchProducts} />} />
            <Route path="/products" element={<ProductList fetchProducts={fetchProducts} products={products} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
