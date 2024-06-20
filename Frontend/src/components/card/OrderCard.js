// components/card/OrderCard.js
import React from "react";

const OrderCard = ({ order, onReorder }) => {
  const { orderItems, orderDate, _id } = order;

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Order ID: {_id}</h3>
      <p className="text-gray-600 mb-2">
        Order Date: {new Date(orderDate).toLocaleDateString()}
      </p>
      <ul className="mb-4">
        {orderItems.map((item, index) => (
          <li key={index} className="flex items-center mb-2">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <p className="text-gray-800">{item.name}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Price: ${item.selectedPrice}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onReorder(order)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Reorder
      </button>
    </div>
  );
};

export default OrderCard;
