import React, { useState, useEffect } from "react";
import { GoogleIcon } from "../../utils/icons/Icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { login, signup, googleAuth } from "../../redux/actions/authActions";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [showError, setShowError] = useState(false);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setShowError(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  useEffect(() => {
    // console.log(authState.user, authState.token);
    if (authState.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (authState.user && authState.token) {
      navigate("/");
    }
  }, [authState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(formData.email, formData.password));
    } else {
      dispatch(
        signup(formData.name, formData.email, formData.phone, formData.password)
      );
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    dispatch(googleAuth(response.credential)); // Dispatch the Google auth token
  };

  const handleGoogleLoginFailure = (error) => {
    alert("Error signing in RightNow");
    console.error("Google login error:", error);
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-xl px-14 py-16 rounded-3xl border-2 border-gray-200">
        <h1 className="text-5xl font-semibold">
          {isLogin ? "Welcome Back" : "Hola Amigos !!"}
        </h1>
        <p className="font-medium text-center text-lg text-gray-500 mt-4">
          {isLogin
            ? "Welcome back! Please enter your details."
            : "Sign up to get started!"}
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          {isLogin ? (
            <>
              <div className="mb-4">
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              {showError && (
                <div className="text-red-500 text-center mb-4">
                  {authState.error.message}
                </div>
              )}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    className="ml-2 font-medium text-base"
                    htmlFor="remember"
                  >
                    Remember for 30 days
                  </label>
                </div>
                <button className="font-medium text-base text-violet-500 hover:text-gunmetal transition-colors">
                  Forgot Password
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mb-8">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.06] hover:bg-chilli-red ease-in-out py-3 rounded-xl bg-harvest-gold text-white text-lg font-bold">
                  Sign in
                </button>
                <GoogleLogin
                  className="flex border-2 border-gray-300 hover:border-chilli-red items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.06] ease-in-out py-3 rounded-xl"
                  clientId="19247234044-qvuagd11f0kslaftdjehlmpdngr5clm6.apps.googleusercontent.com"
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  scope="profile email openid"
                  prompt="select_account" // This prompts the user to select an account on click
                >
                  <button className="flex border-2 border-gray-300 hover:border-chilli-red items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.06] ease-in-out py-3 rounded-xl">
                    <GoogleIcon />
                    Sign in with Google
                  </button>
                </GoogleLogin>
              </div>
              <div className="flex justify-center items-center">
                <p className="font-medium text-base">Don't have an account?</p>
                <button
                  className="text-violet-500 text-base font-medium ml-2"
                  onClick={handleToggleForm}
                >
                  Sign up
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-lg font-medium">Name</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium">Phone Number</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your phone number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {showError && (
                <div className="text-red-500 text-center mb-4">
                  {authState.error.message}
                </div>
              )}
              <div className="flex flex-col gap-y-4 mb-8">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.06] hover:bg-chilli-red ease-in-out py-3 rounded-xl bg-harvest-gold text-white text-lg font-bold">
                  Sign up
                </button>
              </div>
              <div className="flex justify-center items-center">
                <p className="font-medium text-base">
                  Already have an account?
                </p>
                <button
                  className="text-violet-500 text-base font-medium ml-2"
                  onClick={handleToggleForm}
                >
                  Sign in
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
