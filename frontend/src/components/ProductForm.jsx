import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    urlType: '',
  });
  const [file, setFile] = useState(null); // for local file
  const [previewUrl, setPreviewUrl] = useState(null); // for preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile)); // create local preview URL
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('urlType', product.urlType);
      if (file) {
        formData.append('file', file); // add file to the form data
      }

      await axios.post('http://localhost:8080/api/products', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      fetchProducts();
      setProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        urlType: '',
      });
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreview = () => {
    if (!previewUrl) return null;

    if (product.urlType === 'image') {
      return (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded mt-2"
        />
      );
    } else if (product.urlType === 'video') {
      return (
        <video
          src={previewUrl}
          controls
          className="w-full h-48 object-cover rounded mt-2"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="border p-2 w-full rounded"
        required
      />
      
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price (in USD)"
        className="border p-2 w-full rounded"
        required
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="border p-2 w-full rounded"
        required
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="clothing">Clothing</option>
        <option value="furniture">Furniture</option>
        <option value="other">Other</option>
      </select>

      <select
        name="urlType"
        value={product.urlType}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Select URL Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      {/* File Input */}
      <input
        type="file"
        accept={product.urlType === 'image' ? 'image/*' : product.urlType === 'video' ? 'video/*' : ''}
        onChange={handleFileChange}
        className="border p-2 w-full rounded"
        required
      />

      {/* Preview */}
      {renderPreview()}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-4"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
