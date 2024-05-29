import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Adjust the import path

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
