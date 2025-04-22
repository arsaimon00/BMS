import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={`/images/${product.image}`} 
        alt={product.name} 
        className="product-image" 
      />
      <h3>{product.name}</h3>
    </div>
  );
};

export default ProductCard;
