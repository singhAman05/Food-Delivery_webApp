import { Link } from "react-router-dom";
import "./footer.css";
const React = require("react");

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="logo.png" alt="logo" className="logo" />
        </div>
        <div className="footer-company">
          <h3 className="company-name">Crave-Express</h3>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Crave-Express. All rights reserved.</p>
      </div>
      <div className="footer-links">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
