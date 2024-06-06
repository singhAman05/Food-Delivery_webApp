// src/redux/reducers/cartReducer.js

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedOption === action.payload.selectedOption
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id &&
            item.selectedOption === action.payload.selectedOption
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id &&
          item.selectedOption === action.payload.selectedOption
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id &&
          item.selectedOption === action.payload.selectedOption
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            item.id !== action.payload.id ||
            item.selectedOption !== action.payload.selectedOption
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
