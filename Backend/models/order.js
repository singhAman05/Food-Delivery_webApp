const mongoose = require("mongoose");

const order = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

const user_order = mongoose.model("orders_db", order);
module.exports = user_order;
