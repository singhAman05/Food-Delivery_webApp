import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../redux/actions/cartActions";
import { Remove, Add, Delete, Close } from "../../utils/icons/Icons";

const CartItemCard = ({ item }) => {
  const [isSliding, setIsSliding] = useState(false);
  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch(decreaseQuantity(item.id));
  };

  const handleDeleteClick = () => {
    setIsSliding(true);
  };

  const handleRemoveClick = () => {
    dispatch(removeItem(item.id));
    setIsSliding(false);
  };

  const handleCloseClick = () => {
    setIsSliding(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg overflow-hidden">
      <div
        className={`flex items-center space-x-4 px-5 py-5 transition-transform duration-200 ${
          isSliding ? "-translate-x-40" : ""
        }`}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <div>
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
      <div
        className={`flex items-center space-x-4 mt-4 md:mt-0 transition-transform duration-200 ${
          isSliding ? "-translate-x-40" : ""
        }`}
      >
        <span className="text-center font-bold">{item.quantity}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
            className="px-2 py-1 text-gunmetal rounded"
          >
            <Add />
          </button>
          <button
            onClick={handleDecrement}
            className="px-2 py-1 text-harvest-gold rounded"
          >
            <Remove />
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-2 py-1 text-chilli-red rounded"
          >
            <Delete />
          </button>
        </div>
      </div>
      <div
        className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-40 bg-red-500 text-white rounded-r-lg cursor-pointer transition-transform duration-200 ease-in-out ${
          isSliding ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleRemoveClick} className="flex-1 text-center">
          Remove
        </button>
        <button
          onClick={handleCloseClick}
          className="text-center px-2 text-white"
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
