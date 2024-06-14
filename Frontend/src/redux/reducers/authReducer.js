// src/redux/reducers/authReducer.js
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from "../constants/constants";

// Function to retrieve user data from localStorage
const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : null;
};

const initialState = {
  user: getUserFromLocalStorage(), // Initialize user from localStorage
  token: localStorage.getItem("jwtToken") || null, // Initialize token from localStorage
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      // Store user data and token in localStorage
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("jwtToken", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      // Clear user data and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
