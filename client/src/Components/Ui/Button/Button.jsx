import React from "react";

const Button = ({ type, children, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
