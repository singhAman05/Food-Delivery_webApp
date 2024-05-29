import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";

const SetFoodItem = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getFoodItems"
        );
        // Check if response.data is an array
        if (Array.isArray(response.data.foodItems)) {
          setFoodItems(response.data.foodItems);
        } else {
          console.error("Invalid data format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {foodItems.map((foodItem) => (
        <Card key={foodItem.id} food={foodItem} className="m-2" />
      ))}
    </div>
  );
};

export default SetFoodItem;
