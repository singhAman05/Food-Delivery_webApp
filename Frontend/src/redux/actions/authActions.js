import axios from "axios";
// Action Types
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "../constants/constants";

import { handleSuccess } from "../../utils/notifications/notify";

// API URL
const API_URL =
  "https://craveexpressserver-git-master-amans-projects-4ae4e25a.vercel.app/api/v1";

// Action Creators
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // console.log(response);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    handleSuccess(response);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  }
};

export const signup = (name, email, phone, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      phone,
      password,
    });
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    handleSuccess(response);
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response.data });
  }
};

export const googleAuth = (g_id_token) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/googleAuth`, { g_id_token });
    // console.log(response);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    handleSuccess(response);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  // if (userId) {
  //   localStorage.removeItem(`cart_${userId}`); // Remove specific cart from localStorage
  // }
  localStorage.removeItem("user"); // Clear user from localStorage
  localStorage.removeItem("jwtToken"); // Clear token from localStorage
  dispatch({ type: LOGOUT });
};
