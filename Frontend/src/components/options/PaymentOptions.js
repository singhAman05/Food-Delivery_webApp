import React, { useState } from "react";
import { Up, Down } from "../../utils/icons/Icons";

const PaymentOptions = ({ paymentOptions, selectedOption, onSelectOption }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative">
      <button className="text-gunmetal" onClick={toggleOptions}>
        Payment Options {showOptions ? <Down /> : <Up />}
      </button>
      {showOptions && (
        <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-gray-200 rounded shadow-lg z-20">
          {paymentOptions.map((option, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectOption(option.name)}
            >
              <span className="text-left flex-grow">{option.name}</span>
              <span className="text-right px-3">
                <input
                  type="radio"
                  name="selectedOption"
                  value={option.name}
                  checked={selectedOption === option.name}
                  onChange={() => onSelectOption(option.name)}
                  className="h-4 w-4 border border-gray-300 rounded-full checked:bg-harvest-gold checked:border-transparent focus:outline-none focus:ring focus:ring-harvest-gold focus:ring-opacity-50"
                />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
