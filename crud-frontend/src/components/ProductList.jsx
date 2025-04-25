import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ fetchProducts, products }) => {
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4 mt-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-red-500 text-white py-1 px-3 mt-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
