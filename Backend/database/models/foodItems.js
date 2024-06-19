const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  category: String,
  name: String,
  image: String, // Store the original filename of the image
  imageUrl: String, // Store the Cloudinary URL of the uploaded image
  options: [Object], // Assuming options is an array of objects
  description: String,
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;

const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json({ foodItems });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
