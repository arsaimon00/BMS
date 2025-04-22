const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Accepted', 'In Progress', 'Ready', 'Completed'],
      default: 'Accepted',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Automatically increment Order ID (OS1, OS2, etc.)
orderSchema.pre('save', async function (next) {
  const lastOrder = await this.constructor.findOne().sort('-createdAt');
  const lastOrderId = lastOrder ? lastOrder.orderId : 'OS0';
  const orderNumber = parseInt(lastOrderId.replace('OS', '')) + 1;
  this.orderId = `OS${orderNumber}`;
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
