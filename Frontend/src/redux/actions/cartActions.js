// Action Types
import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
  LOAD_CART,
  CLEAR_CART,
} from "../constants/constants";

// Load the cart from localStorage
export const loadCart = (userId) => {
  const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  return { type: LOAD_CART, payload: { cart: savedCart, userId } };
};

// Add an item to the cart and save to localStorage
export const addToCart = (food) => (dispatch, getState) => {
  const { id, name, image, selectedOption, selectedPrice, userId } = food;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      item: {
        id,
        name,
        image,
        selectedOption,
        selectedPrice,
        quantity: 1,
      },
      userId,
    },
  });
};

// Increase quantity and save to localStorage
export const increaseQuantity =
  (id, selectedOption, userId) => (dispatch, getState) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: { id, selectedOption, userId },
    });

    const updatedCart = getState().cart.cart;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

// Decrease quantity and save to localStorage
export const decreaseQuantity =
  (id, selectedOption, userId) => (dispatch, getState) => {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: { id, selectedOption, userId },
    });

    const updatedCart = getState().cart.cart;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

// Remove item and save to localStorage
export const removeItem =
  (id, selectedOption, userId) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: { id, selectedOption, userId },
    });

    const updatedCart = getState().cart.cart;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

// Clear the cart and remove from localStorage
export const clearCart = (userId) => (dispatch) => {
  localStorage.removeItem(`cart_${userId}`);
  dispatch({ type: CLEAR_CART, payload: { userId } });
};
