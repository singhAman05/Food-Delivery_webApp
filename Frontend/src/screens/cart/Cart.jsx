import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../../components/card/CartCard";
import { Checkout } from "../../utils/icons/Icons";
import PaymentOptions from "../../components/options/PaymentOptions";
import { loadCart } from "../../redux/actions/cartActions"; // Import loadCart action

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { token, user } = useSelector((state) => state.auth);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Check if user is not authenticated, then redirect
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Load the cart from localStorage
  useEffect(() => {
    console.log(user.id);
    if (user) {
      dispatch(loadCart(user.id));
    }
  }, [user, dispatch]);

  // Fetch payment options data from API
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/getPaymentOptions"
        );
        setPaymentOptions(res.data.paymentOptions || []);
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
      id: parseInt(item.id),
      name: item.name,
      selectedPrice: item.selectedPrice,
      quantity: item.quantity,
      imageUrl: item.image,
    }));

    // Create order details object with required fields
    const orderDetails = {
      items: formattedItems,
      paymentOption: selectedOption,
      subtotal: subtotal,
      cgst: cgstAmount,
      sgst: sgstAmount,
      grandTotal: grandTotal,
    };

    console.log("Order Details:", orderDetails);

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        `http://localhost:5000/api/v1/${selectedOption}/payment`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const approvalUrl = response.data.approvalUrl;
      window.location.href = approvalUrl;
    } catch (error) {
      console.error("Error submitting order:", error);
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
                  Subtotal: <span className="text-chilli-red">&#36; </span>
                  {subtotal.toFixed(2)}
                </span>
                <div className="mt-2">
                  <span className="text-sm text-gunmetal">
                    CGST ({CGST_PERCENTAGE}%):{" "}
                    <span className="text-chilli-red">&#36; </span>
                    {cgstAmount.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-sm text-gunmetal">
                    SGST ({SGST_PERCENTAGE}%):{" "}
                    <span className="text-chilli-red">&#36; </span>
                    {sgstAmount.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-bold text-gunmetal">
                    Grand Total: <span className="text-chilli-red">&#36; </span>
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
