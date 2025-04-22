const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

connectDB(); // Connect to MongoDB

const sampleProducts = [
  { name: 'Bread', price: 2.5, description: 'Freshly baked white bread', stock: 100 },
  { name: 'Cake', price: 5.0, description: 'Chocolate cake with icing', stock: 50 },
  { name: 'Cookies', price: 1.5, description: 'Crispy chocolate chip cookies', stock: 200 },
];

const sampleOrders = [
  {
    orderId: 'OS1',
    products: [
      { name: 'Bread', quantity: 5 },
      { name: 'Cake', quantity: 2 }
    ],
    status: 'Accepted',
  },
  {
    orderId: 'OS2',
    products: [
      { name: 'Cookies', quantity: 10 },
      { name: 'Cake', quantity: 3 }
    ],
    status: 'In Progress',
  }
];

const populateDatabase = async () => {
  try {
    // Insert products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted.');

    // Insert orders
    await Order.insertMany(sampleOrders);
    console.log('Sample orders inserted.');

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating data:', error);
  }
};

populateDatabase();
