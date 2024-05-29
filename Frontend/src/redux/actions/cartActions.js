export const addToCart = (item) => {
  // console.log("item received at redux actions");
  // console.log(item);
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: itemId,
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: itemId,
  };
};

export const removeItem = (itemId) => {
  return {
    type: "REMOVE_ITEM",
    payload: itemId,
  };
};
