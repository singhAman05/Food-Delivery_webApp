import React, { useState } from "react";
import { Up, Down } from "../../utils/icons/Icons";
import PaymentsIcon from "@mui/icons-material/Payments";

const PaymentOptions = ({ paymentOptions, onSelectOption }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (optionName) => {
    setSelectedOption(optionName);
    onSelectOption(optionName);
    setShowOptions(false); // Close options menu after selection
  };

  return (
    <div className="relative">
      <button
        className="text-gunmetal flex items-center"
        onClick={toggleOptions}
      >
        <PaymentsIcon className="mr-2" />
        {selectedOption || "Select Payment Option"}{" "}
        {showOptions ? <Down /> : <Up />}
      </button>
      {showOptions && (
        <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-gray-200 rounded shadow-lg z-20">
          {paymentOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option.name)}
            >
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
