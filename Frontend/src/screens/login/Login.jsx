import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader.js";
import "./login.css";
import register_image from "../../Images/Register.svg";
import login_image from "../../Images/Login.svg";
import {
  handleErrors,
  handleSuccess,
} from "../../utils/notifications/notify.js";
import {
  Envelope,
  Lock,
  Instagram,
  Youtube,
  Twitter,
  User,
  Phone,
  LinkedIn,
} from "../../utils/icons/Icons";

const Login = () => {
  const navigate = useNavigate();
  // handling change data
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        formData
      );

      //token reterival and redirecting
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("jwtToken", token);
      handleSuccess(response);
    } catch (error) {
      console.log(error);
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData
      );

      //token reteival and redirecting
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      handleSuccess(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  // to switch over forms
  const cont = React.useRef(null);
  const switchTabs = (e, tabs) => {
    if (tabs === "login") {
      cont.current.classList.remove("sign-up-mode");
    } else if (tabs === "register") {
      cont.current.classList.add("sign-up-mode");
    }
  };
  return (
    <>
      <Loader loading={loading} />
      <div class="container" ref={cont}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form" onSubmit={handleLogin}>
              <h2 class="title">Sign In</h2>

              <div class="input-field">
                <i>{Envelope}</i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div class="input-field">
                <i>{Lock}</i>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <a href="#" class="href">
                Forgot password :(
              </a>
              <input type="submit" value="Log In" class="btn solid" />
              <p class="social-text">
                Follow us on social media to get latest updates
              </p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i>
                    <Instagram />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <Twitter />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <Youtube />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <LinkedIn />
                  </i>
                </a>
              </div>
            </form>
            <form action="#" class="sign-up-form" onSubmit={handleSignup}>
              <h2 class="title">Sign-Up</h2>
              <div class="input-field">
                <i>{User}</i>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div class="input-field">
                <i>{User}</i>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div class="input-field">
                <i>{Envelope}</i>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div class="input-field">
                <i>{Phone}</i>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone No."
                />
              </div>
              <div class="input-field">
                <i>{Lock}</i>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>

              <input type="submit" class="btn solid" value="Sign-Up" />
              <p class="social-text">
                Follow us on social media to get latest updates
              </p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i>
                    <Instagram />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <Twitter />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <Youtube />
                  </i>
                </a>
                <a href="#" class="social-icon">
                  <i>
                    <LinkedIn />
                  </i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <img src={register_image} class="image" alt="Register" />
              <p>Not Registered here</p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={(e) => switchTabs(e, "register")}
              >
                Sign-Up
              </button>
            </div>
          </div>
          <div class="panel right-panel">
            <div class="content">
              <img src={login_image} class="image" alt="Login" />
              <p>Already a member</p>
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={(e) => switchTabs(e, "login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
