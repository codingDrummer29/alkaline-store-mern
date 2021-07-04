/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  // destucture state
  const { name, lastname, email, password, error, success } = values;

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, lastname, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          lastname: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
    // .catch(console.log("Error in Signup")); DEBUG: for unwanted console log
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left ">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New account created SUCCESSFULLY. Please{" "}
          <Link to="/signin">Sign in here</Link>
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left ">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form action="">
            <div className="form-group py-2">
              <span className="text-light">Name</span>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-group py-2">
              <span className="text-light">Lastname</span>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("lastname")}
                value={lastname}
              />
            </div>
            <div className="form-group py-2">
              <span className="text-light">Email</span>
              <input
                type="email"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group py-2">
              <span className="text-light">Password</span>
              <input
                type="password"
                className="form-control"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <div className="d-grid mt-3">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="signup page" description="a page for user to signup!">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-center text-white">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
