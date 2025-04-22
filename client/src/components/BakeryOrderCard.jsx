import React from 'react';

const BakeryOrderCard = ({ order, children }) => {
  return (
    <div className="order-card">
      <h4>Order ID: {order.orderId}</h4>
      <ul>
        {order.products.map((product, index) => (
          <li key={index}>
            <span>{product.name}:</span> {product.quantity}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default BakeryOrderCard;
