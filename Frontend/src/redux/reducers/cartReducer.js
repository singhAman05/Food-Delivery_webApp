import {
  ADD_TO_CART,
  LOAD_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
} from "../constants/constants";

const initialState = {
  cart: [], // Initialize cart as empty initially
  userId: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        cart: action.payload.cart,
        userId: action.payload.userId,
      };

    case ADD_TO_CART:
      // console.log(action.payload.userId);
      const updatedCart = [...state.cart, action.payload.item];
      localStorage.setItem(
        `cart_${action.payload.userId}`,
        JSON.stringify(updatedCart)
      );
      return {
        ...state,
        cart: updatedCart,
      };

    case INCREASE_QUANTITY:
      // console.log(action.payload.userId);
      const updatedIncreaseCart = state.cart.map((item) =>
        item.id === action.payload.id &&
        item.selectedOption === action.payload.selectedOption
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem(
        `cart_${action.payload.userId}`,
        JSON.stringify(updatedIncreaseCart)
      );
      return {
        ...state,
        cart: updatedIncreaseCart,
      };

    case DECREASE_QUANTITY:
      // console.log(action.payload.userId);
      const updatedDecreaseCart = state.cart.map((item) =>
        item.id === action.payload.id &&
        item.selectedOption === action.payload.selectedOption
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
      localStorage.setItem(
        `cart_${action.payload.userId}`,
        JSON.stringify(updatedDecreaseCart)
      );
      return {
        ...state,
        cart: updatedDecreaseCart,
      };

    case REMOVE_ITEM:
      const updatedRemoveCart = state.cart.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.selectedOption !== action.payload.selectedOption
      );
      localStorage.setItem(
        `cart_${action.payload.userId}`,
        JSON.stringify(updatedRemoveCart)
      );
      return {
        ...state,
        cart: updatedRemoveCart,
      };

    case CLEAR_CART:
      localStorage.removeItem(`cart_${action.payload.userId}`);
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
