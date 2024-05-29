import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../redux/actions/cartActions";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart && cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Image
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Name
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Description
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Quantity
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.description}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
