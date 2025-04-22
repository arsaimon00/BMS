import React, { useState, useEffect } from 'react';
import api from '../api';
import BakeryOrderCard from '../components/BakeryOrderCard';
import '../styles/Bakery.css';


const Bakery = () => {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch orders by status from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const incoming = await api.get('/orders/status/Accepted');
        const inProgress = await api.get('/orders/status/In Progress');
        const ready = await api.get('/orders/status/Ready');

        setIncomingOrders(incoming.data);
        setInProgressOrders(inProgress.data);
        setReadyOrders(ready.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Move order to "In Progress"
  const startPreparing = async (orderId) => {
    try {
      await api.put(`/orders/status/${orderId}`, { status: 'In Progress' });
      setIncomingOrders((prev) => prev.filter((order) => order._id !== orderId));
      setInProgressOrders((prev) => [...prev, { ...incomingOrders.find(order => order._id === orderId), status: 'In Progress' }]);
    } catch (error) {
      console.error('Error updating order status:', error);
      setMessage('Failed to start preparing the order.');
    }
  };

  // Move order to "Ready"
  const markAsReady = async (orderId) => {
    try {
      await api.put(`/orders/status/${orderId}`, { status: 'Ready' });
      setInProgressOrders((prev) => prev.filter((order) => order._id !== orderId));
      setReadyOrders((prev) => [...prev, { ...inProgressOrders.find(order => order._id === orderId), status: 'Ready' }]);
    } catch (error) {
      console.error('Error updating order status:', error);
      setMessage('Failed to mark order as ready.');
    }
  };

  // Move order to "Completed" and remove from active list
  const completeOrder = async (orderId) => {
    try {
      await api.put(`/orders/status/${orderId}`, { status: 'Completed' });
      setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
      setMessage('Order completed successfully.');
    } catch (error) {
      console.error('Error completing order:', error);
      setMessage('Failed to complete the order.');
    }
  };

  return (
    <div className="bakery-container">
      <h2 className="bakery-heading">Bakery Dashboard</h2>
      {message && <p className="message">{message}</p>}

      <div className="order-columns">
        <div className="order-column">
          <h3>Incoming Orders</h3>
          {incomingOrders.map((order) => (
            <BakeryOrderCard key={order._id} order={order}>
              <button className="action-btn" onClick={() => startPreparing(order._id)}>
                Start Preparing
              </button>
            </BakeryOrderCard>
          ))}
        </div>

        <div className="order-column">
          <h3>In Progress</h3>
          {inProgressOrders.map((order) => (
            <BakeryOrderCard key={order._id} order={order}>
              <button className="action-btn" onClick={() => markAsReady(order._id)}>
                Mark as Ready
              </button>
            </BakeryOrderCard>
          ))}
        </div>

        <div className="order-column">
          <h3>Ready</h3>
          {readyOrders.map((order) => (
            <BakeryOrderCard key={order._id} order={order}>
              <button className="action-btn" onClick={() => completeOrder(order._id)}>
                Complete Order
              </button>
            </BakeryOrderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bakery;
