// src/redux/actions/cartActions.js

export const addToCart = (food) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      id: food.id,
      name: food.name,
      image: food.image,
      selectedOption: food.selectedOption,
      selectedPrice: food.selectedPrice,
      quantity: 1,
    },
  };
};

export const increaseQuantity = (id, selectedOption) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: { id, selectedOption },
  };
};

export const decreaseQuantity = (id, selectedOption) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: { id, selectedOption },
  };
};

export const removeItem = (id, selectedOption) => {
  return {
    type: "REMOVE_ITEM",
    payload: { id, selectedOption },
  };
};
