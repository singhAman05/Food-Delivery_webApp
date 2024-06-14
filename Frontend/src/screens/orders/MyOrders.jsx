import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/card/OrderCard"; // Import the OrderCard component

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is not authenticated, then redirect
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT token

        const response = await axios.get(
          "http://localhost:5000/api/v1/getUserOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in headers
            },
          }
        );

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReorder = (order) => {
    // Handle reorder logic here
    console.log("Reordering:", order);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders. Please try again later.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="flex justify-center flex-wrap mx-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
          >
            <OrderCard order={order} onReorder={handleReorder} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
