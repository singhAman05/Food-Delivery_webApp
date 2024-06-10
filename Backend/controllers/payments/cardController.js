const Order = require("../../database/models/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

// POST /api/v1/submitOrder
const submitOrder = async (req, res) => {
  const { items, paymentOption, subtotal, cgst, sgst, grandTotal } = req.body;

  try {
    if (paymentOption.toLowerCase() === "card") {
      // Create a Stripe Checkout Session

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "inr", // Replace with your currency
          product_data: {
            name: item.name,
            description: `Price: ${item.selectedPrice}`,
            images: ["https://example.com/product.png"], // Replace with your product image URL
          },
          unit_amount: Math.round(item.selectedPrice * 100), // price in cents
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Use your frontend success URL
        cancel_url: `${process.env.FRONTEND_URL}/cancel`, // Use your frontend cancel URL
      });

      // Respond with the session URL to the client
      return res.status(200).json({ approvalUrl: session.url });
    }

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
