// CheckoutPage.js
import React, { useState } from "react";
import "./checkOut.css";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    apartmentNumber: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="checkout-container">
      <div className="form-container">
        <h2>Check Out</h2>
        <form className="checkout-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Street Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
              placeholder="Apartment Number"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>
          <button type="submit">Order</button>
        </form>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{/* Add your table rows here */}</tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Grand Total</td>
              <td>{/* Calculate grand total here */}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CheckoutPage;
