import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "../../utils/icons/Icons";
import { logout } from "../../redux/actions/authActions";
import logo from "../../Images/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cart) || [];

  // Calculate the number of different items in the cart
  const numberOfDifferentItems = cartItems.reduce((count, item) => {
    if (item && item.id) {
      count.add(item.id);
    }
    return count;
  }, new Set()).size;

  // Check if user is logged in
  const isLoggedIn = useSelector((state) => state.auth.user !== null);

  const handleLogout = () => {
    setLoading(true);
    dispatch(logout()); // Dispatch the logout action
    setLoading(false);
    navigate("/login"); // Redirect to home after logout
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest("#menu-dropdown")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="font-poppins relative">
      <Loader loading={loading} />
      <nav className="bg-gunmetal text-ghost-white flex justify-between items-center p-4 relative z-20">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="ml-2 text-xl font-bold">Crave-Express</span>
        </div>

        <button
          className="block md:hidden text-ghost-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>

        {/* Menu Items */}
        <div className="hidden md:flex md:space-x-6 items-center">
          <ul className="flex items-center space-x-6">
            <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  <Link to="/myOrders">My Orders</Link>
                </li>
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer relative">
                  <Link to="/cart">
                    Cart
                    {numberOfDifferentItems > 0 && (
                      <span className="absolute top-0 right-0 -mt-2 bg-harvest-gold text-white rounded-full px-2 py-1 text-xs">
                        {numberOfDifferentItems}
                      </span>
                    )}
                  </Link>
                </li>
                <button
                  onClick={handleLogout}
                  className="bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  <Link to="/menu">Menu</Link>
                </li>
                <li className="mx-3 text-ghost-white hover:text-harvest-gold cursor-pointer">
                  <Link to="/about">About Us</Link>
                </li>
                <Link to="/login">
                  <button className="transition ease-in delay-150 bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded ml-4 duration-300">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div
            id="menu-dropdown"
            className="absolute top-14 left-0 w-full bg-gunmetal text-ghost-white z-10 shadow-lg"
          >
            <ul className="flex flex-col items-center space-y-4 p-4">
              <li className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                    <Link to="/myOrders" onClick={() => setIsMenuOpen(false)}>
                      My Orders
                    </Link>
                  </li>
                  <li className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                      Cart
                      {numberOfDifferentItems > 0 && (
                        <span className="ml-2 bg-harvest-gold text-white rounded-full px-2 py-1 text-xs">
                          {numberOfDifferentItems}
                        </span>
                      )}
                    </Link>
                  </li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                    <Link to="/menu" onClick={() => setIsMenuOpen(false)}>
                      Menu
                    </Link>
                  </li>
                  <li className="text-ghost-white hover:text-harvest-gold cursor-pointer">
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                      About Us
                    </Link>
                  </li>
                  <Link to="/login">
                    <button
                      className="transition ease-in delay-150 bg-harvest-gold hover:bg-chilli-red text-white px-4 py-2 rounded duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
