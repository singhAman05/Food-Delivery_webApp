import { UseDispatch, Usecart } from "./ContextReducer";
import { useState } from "react";
const React = require("react");

const Card = (props) => {
  //using props
  let options = props.options;
  let priceOption = Object.keys(options);
  let food_item = props.food_all;

  //initializing cart variables
  let data = Usecart();
  let dispatch = UseDispatch();
  const [qnty, setQnty] = useState(1);
  const [size, setSize] = useState("half");
  let finalPrice = qnty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === food_item._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: food_item._id,
          price: finalPrice,
          qty: qnty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: food_item._id,
          name: food_item.name,
          price: finalPrice,
          qty: qnty,
          size: size,
        });
        // console.log(data);
      }
    } else {
      await dispatch({
        type: "ADD",
        id: food_item._id,
        name: food_item.name,
        price: finalPrice,
        qty: qnty,
        size: size,
      });
    }
  };

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <img
        src=""
        className="card-image-top"
        alt="Card image cap"
        style={{ height: "130px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{food_item.name}</h5>
        <p className="card-text">{food_item.description}</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-info"
            onChange={(e) => setQnty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-info"
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOption.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <hr />
          <div className="d-inline fs-5 h-100">Rs {finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
