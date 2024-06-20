const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [
    {
      orderItems: {
        type: Array,
        required: true,
      },
      orderDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
