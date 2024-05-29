import { UseDispatch, Usecart } from "../components/ContextReducer";
const React = require("react");

const Cart = () => {
  let cartData = Usecart();
  let dispatch = UseDispatch();
  // console.log(cartData.length);

  const handleCheckOut = async () => {
    const user_email = localStorage.getItem("user_email");
    const resp = await fetch("http://localhost:8000/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_email,
        order_data: cartData,
        orderDate: new Date().toDateString(),
      }),
    });
    if (resp.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  if (cartData) {
    if (cartData.length === 0) {
      return (
        <div>
          <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
        </div>
      );
    }
  }

  let totalPrice = cartData.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <div
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Delete
                    </div>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleCheckOut}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
