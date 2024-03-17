import "./login.css";
import register_image from "../../Images/Register.svg";
import login_image from "../../Images/Login.svg";
import {
  Envelope,
  Lock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  User,
  Phone,
} from "../../utils/icons/Icons";
const React = require("react");
const Login = () => {
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
      <div class="container" ref={cont}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="title">Sign In</h2>

              <div class="input-field">
                <i>{Envelope}</i>
                <input type="text" placeholder="Email" />
              </div>
              <div class="input-field">
                <i>{Lock}</i>
                <input type="password" placeholder="Password" />
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
                  <i>{Instagram}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Twitter}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Youtube}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Facebook}</i>
                </a>
              </div>
            </form>
            <form action="#" class="sign-up-form">
              <h2 class="title">Sign-Up</h2>
              <div class="input-field">
                <i>{User}</i>
                <input type="text" name="firstName" placeholder="First Name" />
              </div>
              <div class="input-field">
                <i>{User}</i>
                <input type="text" name="firstName" placeholder="Last Name" />
              </div>
              <div class="input-field">
                <i>{Envelope}</i>
                <input type="text" name="lastName" placeholder="Email" />
              </div>
              <div class="input-field">
                <i>{Phone}</i>
                <input type="email" name="email" placeholder="Phone No." />
              </div>
              <div class="input-field">
                <i>{Lock}</i>
                <input type="password" placeholder="Password" />
              </div>

              <input type="submit" class="btn solid" value="Sign-Up" />
              <p class="social-text">
                Follow us on social media to get latest updates
              </p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i>{Instagram}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Twitter}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Youtube}</i>
                </a>
                <a href="#" class="social-icon">
                  <i>{Facebook}</i>
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
