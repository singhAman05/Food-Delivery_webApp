const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  category: String,
  name: String,
  image: String,
  options: [String], // Assuming options is an array of strings
  description: String,
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
