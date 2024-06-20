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
          currency: "usd", // Replace with your currency
          product_data: {
            name: item.name,
            description: `Price: ${item.selectedPrice}`,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.selectedPrice * 100), // price in cents
        },
        quantity: item.quantity,
      }));

      const itemMetadata = items.map((item) => ({
        _id: item.id,
        name: item.name,
        quantity: item.quantity,
        selectedPrice: item.selectedPrice,
        imageUrl: item.imageUrl,
      }));
      const itemMetadataString = JSON.stringify(itemMetadata);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Use your frontend success URL
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        metadata: {
          orderId: `{CHECKOUT_SESSION_ID}`,
          items: itemMetadataString, // Array of ordered items
        },
      });

      // Respond with the session URL to the client
      return res.status(200).json({ approvalUrl: session.url });
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    res.status(500).json({ message: "Error submitting order", error });
  }
};

const retrieveSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitOrder,
  retrieveSession,
};
