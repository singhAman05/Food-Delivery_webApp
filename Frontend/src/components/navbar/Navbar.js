import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";

const Navbar = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  // Get the cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cart);
  // Calculate the number of different items in the cart
  const numberOfDifferentItems = new Set(cartItems.map((item) => item.id)).size;

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
              <ul className="flex space-x-6 relative">
                <li className="mx-3">
                  <span className="text-ghost-white hover:text-harvest-gold cursor-pointer relative">
                    My Cart
                    {numberOfDifferentItems > 0 && (
                      <span className="absolute top-0 right-0 -mt-2 bg-harvest-gold text-white rounded-full px-2 py-1 text-xs">
                        {numberOfDifferentItems}
                      </span>
                    )}
                  </span>
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
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  Menu
                </li>
              </ul>
              <Link to="/cart">
                <ul className="flex space-x-6">
                  <li className="mx-3 relative">
                    <span className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                      Cart
                    </span>
                    {numberOfDifferentItems > 0 && (
                      <span className="absolute top-0 right-0 bg-harvest-gold text-white rounded-full px-2 py-1 text-xs">
                        {numberOfDifferentItems}
                      </span>
                    )}
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
