// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer"; // Assuming you have a rootReducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Add middleware, devTools, etc. as needed
});

console.log("items received at store");

export default store;
