import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SavedProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        No product data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Saved Product Details</h2>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default SavedProduct;
