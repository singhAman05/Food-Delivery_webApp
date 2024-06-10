import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../../components/card/OrderCard"; // Import the OrderCard component

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders. Please try again later.</div>;

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
