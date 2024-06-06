const mongoose = require("mongoose");

const paymentOptionSchema = new mongoose.Schema({
  name: String,
  logo: String,
});

const PaymentOption = mongoose.model("PaymentOption", paymentOptionSchema);

module.exports = PaymentOption;
