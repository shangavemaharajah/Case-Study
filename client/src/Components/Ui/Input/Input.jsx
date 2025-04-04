import React from "react";

const Input = ({ type, name, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      required
    />
  );
};

export default Input;
