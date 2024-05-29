import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { logoutSuccess } from "../../redux/actions/authActions";
import Loader from "../loader/Loader";
// import "./navbar.css";

const Navbar = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("jwtToken");
    logout();
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="font-poppins">
      <Loader loading={loading} />
      <nav className="bg-gunmetal text-ghost-white flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="logo.png" alt="logo" className="w-10 h-10" />
          <span className="ml-2 text-xl font-bold">Crave-Express</span>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-6">
            <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
              Home
            </li>
          </ul>
          {isLoggedIn ? (
            <>
              <ul className="flex space-x-6">
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  My Cart
                </li>
              </ul>
              <ul className="flex space-x-6">
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  My Orders
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ul className="flex space-x-6">
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointerr">
                  Menu
                </li>
              </ul>
              <Link to="/cart">
                <ul className="flex space-x-6">
                  <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                    Cart
                  </li>
                </ul>
              </Link>
              <Link to="/login">
                <button className="transition ease-in delay-150 bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded ml-4 duration-300">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
