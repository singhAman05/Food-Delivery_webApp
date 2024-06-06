import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/card/CartCard"; // Import the new Card component
import { Checkout } from "../../utils/icons/Icons";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  // Calculate Grand Total
  const grandTotal = cart.reduce((total, item) => {
    return total + item.selectedPrice * item.quantity;
  }, 0);

  return (
    <div className="mx-auto px-1 py-5 mt-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart && cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <CartCard key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mt-6">
            <span className="text-xl font-bold text-gunmetal">
              Grand Total: <span className="text-chilli-red">&#8377; </span>
              {grandTotal.toFixed(2)}
            </span>
            <button className="bg-chilli-red hover:bg-harvest-gold text-white font-bold py-2 px-4 rounded">
              <Checkout /> <span>Order Now</span>
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
