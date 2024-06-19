import React, { useEffect, useState, useMemo } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import axios from "axios";

const origin = { lat: 28.6139, lng: 77.209 }; // Delhi, India
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

const SuccessPage = () => {
  const [timer, setTimer] = useState(40 * 60); // 40 minutes in seconds
  const [destination, setDestination] = useState(
    JSON.parse(localStorage.getItem("clientLocation"))
  );
  const [address, setAddress] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const location = useLocation();

  // Memoize options to ensure they do not change between renders
  const loaderOptions = useMemo(
    () => ({
      googleMapsApiKey: apiKey,
      libraries: ["places"],
    }),
    [apiKey]
  );

  const { isLoaded } = useJsApiLoader(loaderOptions);

  useEffect(() => {
    const fetchOrder = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      console.log(sessionId);
      if (!sessionId) {
        console.log("Session ID not found");
        // Handle the case where sessionId is not present
        return; // Exit function early
      }

      try {
        const info = {
          sessionId: sessionId,
        };
        const response = await axios.post(
          `http://localhost:5000/api/v1/Card/retrieve_session`,
          info
        );
        const orderItems = JSON.parse(response.data.metadata.items);
        console.log(orderItems); // Logging the response data
        setOrderDetails(orderItems); // Set order details in state

        // Fetch address based on user location
        if (destination) {
          fetchAddress(destination.lat, destination.lng);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [location.search, destination]);

  useEffect(() => {
    // Fetch user location on page load
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            localStorage.setItem(
              "clientLocation",
              JSON.stringify(userLocation)
            );
            setDestination(userLocation);
            // Fetch address based on user location
            fetchAddress(userLocation.lat, userLocation.lng);
          },
          (error) => {
            console.error("Error fetching user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=6672fa6a011e0304047962kyg16337b`
      );
      const addressData = response.data.address;
      setAddress(
        `${addressData.city}, ${addressData.state}, ${addressData.country} - ${addressData.postcode}`
      );
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl">
        <div className="h-64 mb-4">
          <GoogleMap
            center={origin}
            zoom={10}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >
            {destination && (
              <>
                <Marker
                  position={origin}
                  label="Origin"
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />
                <Marker
                  position={{ lat: destination.lat, lng: destination.lng }}
                  label="Destination"
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              </>
            )}
          </GoogleMap>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Order Details</h2>
          {orderDetails.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-16 h-16 mr-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">{item.name}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">Price: ${item.selectedPrice}</p>
              </div>
            </div>
          ))}
          <p className="text-gray-700">
            Delivery Address: {address || "Fetching address..."}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Time Remaining:</h2>
            <span className="text-xl font-mono bg-gray-200 p-2 rounded-lg">
              {formatTime(timer)}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => alert("Order cancelled")}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
