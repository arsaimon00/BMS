const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrdersByStatus,
  updateOrderStatus,
  getOrderHistory,
  getProducts,
} = require('../controllers/orderController');

// POST /api/orders/create - Create a new order
router.post('/create', createOrder);

// GET /api/orders/products - Get product list
router.get('/products', getProducts);

// PUT /api/orders/status/:id - Update order status by ID
router.put('/status/:id', updateOrderStatus);

// GET /api/orders/status/:status - Get orders by status (Accepted, In Progress, Ready, Completed)
router.get('/status/:status', getOrdersByStatus);

// GET /api/orders/history - Get completed orders (order history)
router.get('/history', getOrderHistory);

module.exports = router;
