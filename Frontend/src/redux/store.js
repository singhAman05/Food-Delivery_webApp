// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer"; // Assuming you have a rootReducer
import authReducer from "./reducers/authReducer";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  // Add middleware, devTools, etc. as needed
});

console.log("items received at store");

export default store;
