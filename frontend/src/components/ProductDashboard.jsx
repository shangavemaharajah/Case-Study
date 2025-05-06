import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import axios from 'axios';

const ProductDashboard = () => {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Product Management Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <ProductForm fetchProducts={fetchProducts} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-semibold mb-4">Product List</h2>
            <ProductList products={products} fetchProducts={fetchProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
