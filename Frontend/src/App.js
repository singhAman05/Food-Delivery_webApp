import React from "react";
import Home from "./screens/home/Home.jsx";
import Login from "./screens/login/Login.jsx";
import AboutUsPage from "./screens/aboutUs/AboutUs.jsx";
import Cart from "./screens/cart/Cart.jsx";
import MyOrders from "./screens/orders/MyOrders.jsx";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store.js";

const clientId =
  "19247234044-qvuagd11f0kslaftdjehlmpdngr5clm6.apps.googleusercontent.com";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
