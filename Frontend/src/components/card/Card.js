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

const Card = ({ food }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Get the cart from the Redux store
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const cartItem = cart.find((item) => item.id === food._id);
  console.log(cartItem);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setLoading(true);
    const foodWithId = { ...food, id: food._id };
    dispatch(addToCart(foodWithId));
    setLoading(false);
  };

  const handleIncrement = () => {
    setLoading(true);
    dispatch(increaseQuantity(food._id));
    setLoading(false);
  };

  const handleDecrement = () => {
    setLoading(true);
    if (cartItem.quantity === 1) {
      dispatch(removeItem(food._id));
    } else {
      dispatch(decreaseQuantity(food._id));
    }
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="mt-10 mb-10 max-w-sm rounded overflow-hidden shadow-xl m-4 transition-transform transform hover:scale-105">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{food.name}</h2>
          <p className="text-gray-700 text-base">{food.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-end">
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
