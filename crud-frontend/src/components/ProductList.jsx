import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleDelete = (index) => {
    products.splice(index, 1);
    setMenuIndex(null);
  };

  const handleEdit = (index) => {
    alert(`Edit post at index ${index}`);
    setMenuIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        All Posts
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No posts yet.</p>
      ) : (
        products.map((p, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 p-6"
          >
            <div className="flex items-center gap-6">
              {/* 🖼️ Image Preview */}
              <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm shrink-0">
                {p.file?.name ? "Image Uploaded" : "No Image"}
              </div>

              {/* Post Content */}
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {p.title}
                  </h3>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuIndex(menuIndex === index ? null : index)
                      }
                      className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                      ⋮
                    </button>
                    {menuIndex === index && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => handleEdit(index)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  Category: {p.category}
                </p>
                <p className="text-gray-700 mb-2">{p.content}</p>
                <p className="text-xs text-gray-400">File: {p.file?.name}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
