import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartPlus } from "../../utils/icons/Icons";
import Loader from "../loader/Loader";
import { addToCart } from "../../redux/actions/cartActions";

const Card = ({ food }) => {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCart = () => {
    setLoading(true);
    console.log("item sent to redux");
    const id = food._id;
    const foodWithId = { ...food, id };
    // console.log(food._id);
    dispatch(addToCart(foodWithId)); // Pass the food item as payload
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
          <button
            className="bg-harvest-gold hover:bg-chilli-red text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleCart}
          >
            {CartPlus}
            <span className="ml-2">Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
