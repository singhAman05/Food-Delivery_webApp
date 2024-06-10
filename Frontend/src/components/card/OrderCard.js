import React from "react";

// OrderCard component to display individual order details
const OrderCard = ({ order }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
      <p className="text-sm text-gray-600 mb-2">
        Number of Items: {order.items.length}
      </p>
      <ul className="mb-4">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="flex-grow">{item.name}</span>
            <span className="mx-2">x {item.quantity}</span>
            <span className="font-semibold">₹{item.selectedPrice}</span>
          </li>
        ))}
      </ul>
      <p className="text-right font-semibold">Total: ₹{order.grandTotal}</p>
    </div>
  );
};

export default OrderCard;
