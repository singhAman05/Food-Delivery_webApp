const Order = require("../database/models/order");

// POST /api/v1/submitOrder
const submitOrder = async (req, res) => {
  // Validate request body

  const { items, paymentOption, subtotal, cgst, sgst, grandTotal } = req.body;

  try {
    // Create a new order with the user info
    const newOrder = new Order({
      user: req.user.id, // Attach user ID from req.user
      items,
      paymentOption,
      subtotal,
      cgst,
      sgst,
      grandTotal,
    });

    // Save order to database
    const savedOrder = await newOrder.save();
    // Respond with the saved order details
    res
      .status(201)
      .json({ message: "Order submitted successfully", order: savedOrder });
  } catch (error) {
    console.error("Error submitting order:", error);
    res.status(500).json({ message: "Error submitting order", error });
  }
};

module.exports = {
  submitOrder,
};
