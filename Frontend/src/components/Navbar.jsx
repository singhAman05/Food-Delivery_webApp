import { Link, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Cart from "../screens/Cart";
import { Usecart } from "./ContextReducer";
const React = require("react");

const Navbar = () => {
  const navigate = useNavigate();
  let data = Usecart();

  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("token");
    window.alert("You have been logged out");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-Italic" to="/">
            On the Wayy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/myorder">
                    My Orders
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="#">
                    Features
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Login/Signup
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={"/cart"}
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="success">
                    {data.length}
                  </Badge>
                </Link>
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
