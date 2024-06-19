import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../utils/icons/Icons";
import Loader from "../loader/Loader";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../redux/actions/cartActions";
import OptionsMenu from "../options/FoodOptions";

const Card = ({ food }) => {
  // console.log(food);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(food);

  // Initialize selected option and price based on the first option
  const [selectedOption, setSelectedOption] = useState(food.options[0].name);
  const [selectedPrice, setSelectedPrice] = useState(food.options[0].price);

  // Get cart items from the state or default to an empty array
  const cart = useSelector((state) => state.cart.cart) || [];
  // console.log(cart);
  // Find the cart item that matches the current food id and selected option
  const cartItem = cart.find(
    (item) =>
      item && item.id === food._id && item.selectedOption === selectedOption
  );
  const quantity = cartItem ? cartItem.quantity : 0;
  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddToCart = () => {
    setLoading(true);

    // console.log(user);
    if (!user) {
      console.error("User not logged in");
      navigate("/login");
      return;
    }
    // console.log(food._id, food.name, selectedOption);
    // Construct the food item to add to cart
    const foodWithId = {
      id: food._id,
      name: food.name,
      image: food.imageUrl,
      selectedOption,
      selectedPrice,
      quantity: 1,
      userId: user.id, // Include userId in payload
    };

    // Dispatch addToCart action
    dispatch(addToCart(foodWithId));

    setLoading(false);
  };

  const handleIncrement = () => {
    setLoading(true);
    dispatch(increaseQuantity(food._id, selectedOption, user.id));
    setLoading(false);
  };

  const handleDecrement = () => {
    setLoading(true);
    if (cartItem.quantity === 1) {
      dispatch(removeItem(food._id, selectedOption, user.id));
    } else {
      dispatch(decreaseQuantity(food._id, selectedOption, user.id));
    }
    setLoading(false);
  };

  const handleSelectOption = (option, price) => {
    setSelectedOption(option);
    setSelectedPrice(price);
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="max-w-sm h-96 rounded overflow-hidden shadow-xl m-4 transition-transform transform hover:scale-105 flex flex-col justify-between">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-40 object-cover"
        />
        <div className="px-6 py-4 flex-1 overflow-hidden">
          <h2 className="font-bold text-xl mb-2">{food.name}</h2>
          <div className="overflow-y-auto scrollbar-hide h-20">
            <p className="text-gunmetal text-base">{food.description}</p>
          </div>
          <OptionsMenu
            options={food.options}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
          />
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
          <span className="text-xl font-bold text-gunmetal">
            <span className="text-chilli-red">&#36; </span>
            {selectedPrice ? selectedPrice.toFixed(2) : ""}
          </span>
          {quantity > 0 ? (
            <div className="flex items-center bg-gray-100 rounded">
              <button
                className="bg-chilli-red hover:bg-dark-red text-ghost-white font-bold py-2 px-4 rounded-l"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="mx-4 text-gunmetal">{cartItem.quantity}</span>
              <button
                className="bg-harvest-gold text-white font-bold py-2 px-4 rounded-r"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="bg-harvest-gold hover:bg-chilli-red text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddToCart}
            >
              <AddToCart />
              <span className="ml-2">Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
