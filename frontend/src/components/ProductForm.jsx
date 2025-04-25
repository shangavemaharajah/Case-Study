import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: null,
    content: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const file = files[0];
      setFormData({ ...formData, file });

      // Create preview URL
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.title.trim()) validationErrors.title = "The title field is required.";
    if (!formData.category.trim()) validationErrors.category = "The category field is required.";
    if (!formData.file) validationErrors.file = "The file field is required.";
    if (!formData.content.trim()) validationErrors.content = "The content field is required.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      addProduct(formData);
      navigate("/products");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Create a New Post</h1>
      <hr className="mb-4 border-gray-300" />
      <div className="bg-white rounded shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white text-xl font-bold p-4">
          Add New Post
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.file ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}

          {/* 👇 Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto max-h-64 object-contain border border-gray-300 rounded"
              />
            </div>
          )}

          <textarea
            name="content"
            placeholder="Post Content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
