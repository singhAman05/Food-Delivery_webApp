const Subscriber = require("../database/models/subscribers");

const createSubscriber = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already added ~_~" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({
      message: "Yaay !! You are subscribed ^o^",
      subscriber: newSubscriber,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    res.status(500).json({ message: "Failed to create subscriber", error });
  }
};

module.exports = {
  createSubscriber,
};
