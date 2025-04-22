const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
  const { products } = req.body;

  try {
    // Check if the products exist in the database
    const productList = await Product.find({ name: { $in: products.map(p => p.name) } });
    const productNames = productList.map(p => p.name);
    
    const invalidProducts = products.filter(p => !productNames.includes(p.name));
    if (invalidProducts.length > 0) {
      return res.status(400).json({ message: 'Invalid products: ' + invalidProducts.map(p => p.name).join(', ') });
    }

    // Create the order
    const newOrder = new Order({
      products,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Get orders by status
const getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ message: 'Error fetching orders by status' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// Get order history (Completed orders)
const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Completed' });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Error fetching order history' });
  }
};

// Get product list
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

module.exports = {
  createOrder,
  getOrdersByStatus,
  updateOrderStatus,
  getOrderHistory,
  getProducts,
};
