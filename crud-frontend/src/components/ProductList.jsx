// src/components/ProductList.jsx
import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">All Posts</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        products.map((p, index) => (
          <div key={index} className="bg-white shadow-md p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">Category: {p.category}</p>
            <p className="mt-2">{p.content}</p>
            <p className="text-xs mt-1 text-gray-400">File: {p.file?.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
