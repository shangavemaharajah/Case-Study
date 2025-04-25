import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', product);
      fetchProducts();
      setProduct({ name: '', price: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Product</button>
    </form>
  );
};

export default ProductForm;
