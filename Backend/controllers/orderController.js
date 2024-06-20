const Order = require("../database/models/order");

const getUserOrders = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the order document by email
    let userOrders = await Order.findOne({ email: email });

    if (userOrders) {
      res.status(200).json(userOrders);
    } else {
      res.status(404).json({ message: "No orders found for this email" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const setUserOrder = async (req, res) => {
  const { orderItems, orderDate, email } = req.body;

  try {
    let userOrder = await Order.findOne({ email });
    if (userOrder) {
      // If user already has orders, append the new order
      userOrder.orders.push({ orderItems, orderDate });
    } else {
      // If user doesn't have any orders, create a new document
      userOrder = new Order({
        email,
        orders: [{ orderItems, orderDate }],
      });
    }

    await userOrder.save();
    return res.status(200).json({ message: "Orders saved successfully." });
  } catch (error) {
    console.error("Error saving orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserOrders,
  setUserOrder,
};
