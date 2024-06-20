const FoodItem = require("../database/models/foodItems");
const path = require("path");
const { uploadImage } = require("../cloudinary/uploadImage");

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
    const foodItemsData = req.body.foodItems;

    // Check if the data is an array
    if (!Array.isArray(foodItemsData)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. Expected an array." });
    }

    const addFoodItem = async (item) => {
      try {
        const imagePath = path.join(__dirname, "../assets", item.image);

        // Upload image to Cloudinary
        const imageUrl = await uploadImage(imagePath);

        // Create a new FoodItem instance
        const foodItem = new FoodItem({
          category: item.category,
          name: item.name,
          image: item.image, // Store the original image filename
          imageUrl: imageUrl, // Set the imageUrl to the Cloudinary URL
          options: item.options,
          description: item.description,
        });

        // Save the food item to the database
        await foodItem.save();
        console.log("Food item saved successfully");
        return foodItem; // Return the saved food item
      } catch (error) {
        console.error("Error adding food item:", error);
        return null; // Return null on error
      }
    };

    // Initialize an array to store the results of added food items
    const savedFoodItems = await Promise.all(
      foodItemsData.map((item) => addFoodItem(item))
    );

    // Filter out any null values from the savedFoodItems array
    const filteredSavedFoodItems = savedFoodItems.filter(
      (item) => item !== null
    );

    res.status(201).json({
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
