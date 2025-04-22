import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Showroom.css';
 
import breadImage from '../images/bread.png';
import cakeImage from '../images/cake.png';
import cookiesImage from '../images/cookies.png';




const imageMap = {
  Bread: breadImage,
  Cake: cakeImage,
  Cookies: cookiesImage,
};

const Showroom = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState('');
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/orders/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accepted = await api.get('/orders/status/Accepted');
        const inProgress = await api.get('/orders/status/In Progress');
        const ready = await api.get('/orders/status/Ready');
        const allOrders = [...accepted.data, ...inProgress.data, ...ready.data];
        setCurrentOrders(allOrders);
      } catch (error) {
        console.error('Error fetching current orders:', error);
      }
    };
    fetchOrders();
  }, [message]);

  const handleQuantityChange = (productName, quantity) => {
    setOrder((prevOrder) => {
      const existing = prevOrder.find((item) => item.name === productName);
      if (existing) {
        existing.quantity = quantity;
      } else {
        prevOrder.push({ name: productName, quantity });
      }
      return [...prevOrder];
    });
  };

  const placeOrder = async () => {
    if (order.length === 0) {
      setMessage('Please add products to the order.');
      return;
    }

    try {
      await api.post('/orders/create', { products: order });
      setMessage('Order placed successfully!');
      setOrder([]);
    } catch (error) {
      setMessage('Failed to place the order.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="showroom-container">
      <h2 className="showroom-heading">Showroom Dashboard</h2>

      {message && <p className="message">{message}</p>}

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={imageMap[product.name]}
              alt={product.name}
              className="product-img"
            />
            <h3>{product.name}</h3>
            <div className="input-group">
              <label htmlFor={product.name}>Quantity</label>
              <input
                type="number"
                id={product.name}
                min="0"
                onChange={(e) =>
                  handleQuantityChange(product.name, parseInt(e.target.value, 10))
                }
                placeholder="Enter quantity"
              />
            </div>
          </div>
        ))}
      </div>

      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>

      <h3 className="section-heading">Current Orders</h3>
      {currentOrders.length === 0 ? (
        <p>No current orders</p>
      ) : (
        <div className="order-list">
          {currentOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>Order ID: {order.orderId}</h4>
              <p>Status: <strong>{order.status}</strong></p>
              <ul>
                {order.products.map((p, index) => (
                  <li key={index}>
                    {p.name} - Qty: {p.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showroom;
