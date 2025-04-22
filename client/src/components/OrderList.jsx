import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order ID: {order.orderId} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
