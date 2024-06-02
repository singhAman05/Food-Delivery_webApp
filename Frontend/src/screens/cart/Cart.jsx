import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/card/CartCard"; // Import the new Card component

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="mx-auto px-1 py-5 mt-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart && cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <CartCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
