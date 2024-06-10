const Order = require("../database/models/order");

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user contains user information after authentication
    const orders = await Order.find({ user: userId });

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

module.exports = {
  getUserOrders,
};
