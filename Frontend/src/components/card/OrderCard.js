import React from "react";

// OrderCard component to display individual order details
const OrderCard = ({ order, onReorder }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-full h-80 flex flex-col justify-between">
      <div>
        <h2 className="text-lg text-gunmetal font-semibold mb-2 truncate">
          Order ID: {order._id}
        </h2>
        <div className="overflow-y-auto h-48 scrollbar-hide">
          <ul>
            {order.items.map((item, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between">
                  <span className="text-left">{item.name}</span>
                  <span className="text-right text-gunmetal">
                    x{item.quantity}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Price:</span>
                  <span className="text-chilli-red">₹{item.selectedPrice}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => onReorder(order)}
        className="hover:bg-chilli-red bg-harvest-gold text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 self-end"
      >
        Re-Order
      </button>
    </div>
  );
};

export default OrderCard;
