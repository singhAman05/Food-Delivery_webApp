import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../validation/signup_validation";

const initialValues = {
  name: "",
  email: "",
  location: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //posting data to backend
  const postData = async (e) => {
    e.preventDefault();

    const { name, email, location, password } = values;

    const res = await fetch("http://localhost:8000/signup/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        location,
        password,
      }),
    });
    const data = res.json();
    if (data.status === 422) {
      console.log("cannot register");
      window.alert("Invalid Registration");
    } else {
      console.log("user registerd");
      window.alert("Registeration Successful");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="name"
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="form-error">{errors.name}</p>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="form-error">{errors.email}</p>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="name">location</label>
            <input
              type="name"
              name="location"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter location"
              autoComplete="off"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="form-error">{errors.location}</p>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="form-error">{errors.password}</p>
          </div>
          <button type="submit" className="btn btn-primary" onClick={postData}>
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
};

//exporting moudles
export default Signup;
