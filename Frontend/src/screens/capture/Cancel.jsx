import React from "react";
import { useNavigate } from "react-router-dom";
import cancel from "../../Images/cancel.svg";

const CancelPage = () => {
  const navigate = useNavigate();
  return (
    <div className=" font-famil:poppins min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
        <img src={cancel} alt="Cancelled" className="w-40 h-40 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like you have cancelled the payment. If this was a mistake or
          you have any questions, please contact our support team.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="px-4 py-2 bg-chilli-red text-white rounded-md hover:bg-harvest-gold"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
