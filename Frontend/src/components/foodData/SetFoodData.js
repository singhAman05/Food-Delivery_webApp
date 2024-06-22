import React, { useState, useEffect, useRef } from "react";
import { Mic, Listen } from "../../utils/icons/Icons";
import axios from "axios";
import Card from "../card/FoodCard";

const SetFoodItem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          `https://crave-express-server.onrender.com/api/v1/getFoodItems`
        );
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

  // USE EFFECT ON LISTENING
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Speech recognition not supported in this browser");
      setIsListening(false);
    }
  }, []);

  //FOR VOICE SEARCH
  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // Filter food items based on the search term
  const filteredFoodItems = foodItems.filter((foodItem) =>
    foodItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered food items by category
  const groupedFoodItems = filteredFoodItems.reduce((acc, foodItem) => {
    if (!acc[foodItem.category]) {
      acc[foodItem.category] = [];
    }
    acc[foodItem.category].push(foodItem);
    return acc;
  }, {});

  return (
    <div className="mx-auto px-1 py-5 mt-10 max-w-7xl">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">Food Items</h1> */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder={
            isListening
              ? "Go on, we are listening to you..."
              : "Search food items or Tell us what you want"
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-l w-1/2 max-w-lg"
        />
        <button
          onClick={handleVoiceSearch}
          className="text-gunmetal p-2 border rounded-r bg-white hover:text-chilli-red"
        >
          {isListening ? <Listen className="text-chilli-red" /> : <Mic />}
        </button>
      </div>

      {Object.entries(groupedFoodItems).length > 0 ? (
        Object.entries(groupedFoodItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="flex flex-wrap justify-center">
              {items.map((foodItem) => (
                <Card key={foodItem._id} food={foodItem} className="m-2" />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl">No food items found</p>
      )}
    </div>
  );
};

export default SetFoodItem;
