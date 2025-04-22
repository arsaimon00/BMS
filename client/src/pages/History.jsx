import React, { useState, useEffect } from 'react';
import api from '../api';

const History = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch completed orders from the backend
  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await api.get('/orders/history');
        setCompletedOrders(response.data);
      } catch (error) {
        console.error('Error fetching completed orders:', error);
      }
    };
    fetchCompletedOrders();
  }, []);

  // Group orders by their completion date
  const groupOrdersByDate = (orders) => {
    return orders.reduce((groups, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  };

  const groupedOrders = groupOrdersByDate(completedOrders);

  return (
    <div className="history-container">
      <h2 className="history-heading">Order History</h2>
      {Object.keys(groupedOrders).length === 0 ? (
        <p>No completed orders found.</p>
      ) : (
        Object.keys(groupedOrders).map((date) => (
          <div key={date} className="order-group">
            <h3 className="order-date">{date}</h3>
            {groupedOrders[date].map((order) => (
              <div key={order._id} className="order-card">
                <h4>Order ID: {order.orderId}</h4>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      <span>{product.name}:</span> {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default History;
