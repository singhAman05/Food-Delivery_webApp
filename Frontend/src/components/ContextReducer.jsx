import { createContext, useReducer, useContext } from "react";
const React = require("react");

const CartState = createContext();
const CartDispatch = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          // console.log(
          //   food.qty,
          //   parseInt(action.qty),
          //   action.price + food.price
          // );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

    case "DROP":
      let empArray = [];
      return empArray;
    default:
      console.log("error in reducer");
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, []);
  return (
    <CartDispatch.Provider value={dispatch}>
      <CartState.Provider value={state}>{children}</CartState.Provider>
    </CartDispatch.Provider>
  );
};

export default CartProvider;

export const Usecart = () => useContext(CartState);
export const UseDispatch = () => useContext(CartDispatch);
