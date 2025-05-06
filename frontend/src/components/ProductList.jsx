import React, { useState } from 'react';
import axios from 'axios';

const ProductList = ({ fetchProducts, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderMedia = (product) => {
    if (product.urlType === 'image') {
      return (
        <img
          src={product.url}
          alt={product.title}
          className="w-full h-48 object-cover rounded mt-2"
        />
      );
    } else if (product.urlType === 'video') {
      return (
        <video
          src={product.url}
          controls
          className="w-full h-48 object-cover rounded mt-2"
        />
      );
    } else {
      return (
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 block">
          View URL
        </a>
      );
    }
  };

  return (
    <div className="grid gap-4 mt-4">
      {currentProducts.map(product => (
        <div key={product.id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <p className="mb-1">Price: ${product.price}</p>
          <p className="mb-1">Description: {product.description}</p>
          <p className="mb-1">Category: {product.category}</p>
          <p className="mb-1">URL Type: {product.urlType}</p>

          {/* Render Image or Video */}
          {renderMedia(product)}

          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-red-500 text-white py-1 px-3 mt-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">{currentPage} / {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
