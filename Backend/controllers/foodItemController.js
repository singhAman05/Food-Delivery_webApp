const FoodItem = require("../database/models/foodItems");

const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json({ foodItems });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const setFoodItems = async (req, res) => {
  try {
    // Get the array of food items from the request body
    const foodItemsData = req.body;

    // Check if the data is an array
    if (!Array.isArray(foodItemsData)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Expected an array." });
    }

    // Save each food item to the database
    const savedFoodItems = await Promise.all(
      foodItemsData.map(async (item) => {
        try {
          // Create a new FoodItem instance
          const foodItem = new FoodItem(item);
          // Save the food item to the database
          await foodItem.save();
          return foodItem; // Return the saved food item
        } catch (error) {
          // If there's an error saving a food item, return null
          console.error("Error saving food item:", error);
          return null;
        }
      })
    );

    // Filter out any null values from the savedFoodItems array
    const filteredSavedFoodItems = savedFoodItems.filter(
      (item) => item !== null
    );

    res
      .status(201)
      .json({
        message: "Food items saved successfully",
        savedFoodItems: filteredSavedFoodItems,
      });
  } catch (error) {
    console.error("Error saving food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getFoodItems,
  setFoodItems,
};
