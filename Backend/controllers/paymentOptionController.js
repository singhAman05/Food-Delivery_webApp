const PaymentOption = require("../database/models/paymentOptions");

const getPaymentOptions = async (req, res) => {
  try {
    const paymentOptions = await PaymentOption.find();
    res.status(200).json({ paymentOptions });
  } catch (error) {
    console.error("Error fetching payment options:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const setPaymentOptions = async (req, res) => {
  try {
    // Ensure that the request body contains the 'paymentOptions' array
    const paymentOptionsData = req.body.paymentOptions;

    if (!Array.isArray(paymentOptionsData)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Expected an array." });
    }

    // Validate each payment option object in the array
    const savedPaymentOptions = await Promise.all(
      paymentOptionsData.map(async (optionData) => {
        if (!optionData.name || !optionData.logo) {
          console.error(
            "Error saving payment option: Missing required fields."
          );
          return null;
        }

        try {
          // Create a new PaymentOption instance
          const paymentOption = new PaymentOption(optionData);
          // Save the payment option to the database
          await paymentOption.save();
          return paymentOption; // Return the saved payment option
        } catch (error) {
          console.error("Error saving payment option:", error);
          return null;
        }
      })
    );

    // Filter out any null values from the savedPaymentOptions array
    const filteredSavedPaymentOptions = savedPaymentOptions.filter(
      (option) => option !== null
    );

    res.status(201).json({
      message: "Payment options saved successfully",
      savedPaymentOptions: filteredSavedPaymentOptions,
    });
  } catch (error) {
    console.error("Error saving payment options:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPaymentOptions,
  setPaymentOptions,
};
