import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you pass orderId as a URL parameter
import GoogleMapReact from "google-map-react"; // Assuming you use Google Maps

const SuccessPage = () => {
  const { orderId } = useParams(); // Retrieve orderId from URL params or Redux state
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details from your backend using orderId
    // Replace with your API endpoint and fetch logic
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data.order); // Assuming order contains originLocation, destinationLocation, etc.
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Render loading or error state while fetching data
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  // Google Maps API key (replace with your own key)
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 0, lng: 0 }} // Center map initially
        defaultZoom={10} // Zoom level
      >
        {/* Marker for origin location */}
        <Marker
          lat={orderDetails.originLocation.lat}
          lng={orderDetails.originLocation.lng}
          text="Origin"
        />

        {/* Marker for destination location */}
        <Marker
          lat={orderDetails.destinationLocation.lat}
          lng={orderDetails.destinationLocation.lng}
          text="Destination"
        />
      </GoogleMapReact>
      <p>
        Estimated delivery time: {orderDetails.estimatedDeliveryTime} minutes
      </p>
    </div>
  );
};

// Custom marker component
const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "blue",
      padding: "5px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export default SuccessPage;
