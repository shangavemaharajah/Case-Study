import React, { useEffect, useState } from 'react';
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">CRUD Application</h1>
      <ProductForm fetchProducts={fetchProducts} />
      <ProductList fetchProducts={fetchProducts} products={products} />
    </div>
  );
};

export default App;
