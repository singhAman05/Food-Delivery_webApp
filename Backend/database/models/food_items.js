const mongoose = require("mongoose");

const food_item = new mongoose.Schema({
  category: String,
  name: String,
  image: String,
  option: Object,
  description: String,
});

const food_it = mongoose.model("food_items", food_item);
module.exports = food_it;
