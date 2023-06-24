//importing dependencies
import React from "react";
import { useFormik } from "formik";
import { Link, json, useNavigate } from "react-router-dom";
import { login_validation } from "../validation/login_validation";

//initials values to the feild
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: login_validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //posting data to backend for checking
  const postData = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    const res = await fetch("http://localhost:8000/signup/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (!data) {
      console.log("not done");
    } else {
      console.log("can be logged in");
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
