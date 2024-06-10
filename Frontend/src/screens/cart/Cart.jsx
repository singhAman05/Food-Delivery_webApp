import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CartCard from "../../components/card/CartCard"; // Import the new Card component
import { Checkout } from "../../utils/icons/Icons";
import PaymentOptions from "../../components/options/PaymentOptions";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  // Fetch payment options data from API
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/getPaymentOptions"
        );
        setPaymentOptions(res.data.paymentOptions || []); // Assuming API returns { paymentOptions: [...] }
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handleSelectOption = (optionName) => {
    setSelectedOption(optionName);
  };

  // Calculate Subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + item.selectedPrice * item.quantity;
  }, 0);

  // Define CGST and SGST percentages
  const CGST_PERCENTAGE = 5;
  const SGST_PERCENTAGE = 5;

  // Calculate CGST and SGST amounts
  const cgstAmount = (subtotal * CGST_PERCENTAGE) / 100;
  const sgstAmount = (subtotal * SGST_PERCENTAGE) / 100;

  // Calculate Grand Total including taxes
  const grandTotal = subtotal + cgstAmount + sgstAmount;

  const handleOrderNow = async () => {
    // Map cart items to match backend structure
    const formattedItems = cart.map((item) => ({
      id: parseInt(item.id), // Convert id to a number using parseInt
      name: item.name,
      selectedPrice: item.selectedPrice,
      quantity: item.quantity,
    }));

    // Create order details object with required fields
    const orderDetails = {
      items: formattedItems,
      paymentOption: selectedOption, // Assuming selectedOption is a string like "Credit Card"
      subtotal: subtotal, // Subtotal amount
      cgst: cgstAmount, // CGST amount
      sgst: sgstAmount, // SGST amount
      grandTotal: grandTotal, // Grand total amount
    };

    console.log("Order Details:", orderDetails); // For debugging

    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve JWT token

      const response = await axios.post(
        `http://localhost:5000/api/v1/${selectedOption}/payment`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in headers
            "Content-Type": "application/json",
          },
        }
      );

      const approvalUrl = response.data.approvalUrl;
      console.log(approvalUrl);
      window.location.href = approvalUrl;
      // Redirect to a success page or show a success message
      // history.push("/order-success"); // Example route, change as needed
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

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
          <div className="relative mt-6">
            <div className="flex flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 min-w-fit">
              <div>
                <span className="text-lg font-bold text-gunmetal">
                  Subtotal: <span className="text-chilli-red">&#8377; </span>
                  {subtotal.toFixed(2)}
                </span>
                <div className="mt-2">
                  <span className="text-sm text-gunmetal">
                    CGST ({CGST_PERCENTAGE}%):{" "}
                    <span className="text-chilli-red">&#8377; </span>
                    {cgstAmount.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-sm text-gunmetal">
                    SGST ({SGST_PERCENTAGE}%):{" "}
                    <span className="text-chilli-red">&#8377; </span>
                    {sgstAmount.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-gunmetal">
                    Grand Total:{" "}
                    <span className="text-chilli-red">&#8377; </span>
                    {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Render PaymentOptions component */}
              <div className="mt-4 self-center">
                <PaymentOptions
                  paymentOptions={paymentOptions}
                  selectedOption={selectedOption}
                  onSelectOption={handleSelectOption}
                />
              </div>
              <button
                className="relative mt-16 mr-4 bg-chilli-red hover:bg-harvest-gold text-white font-bold py-2 px-4 rounded"
                onClick={handleOrderNow}
              >
                <Checkout /> <span>Order Now</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
