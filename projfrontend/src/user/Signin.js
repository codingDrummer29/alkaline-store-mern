/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    // testing purpose default purpose
    email: "admin@test.in",
    password: "test1234",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  // for jwt
  const { user } = isAuthenticated();

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: false, [field]: event.target.value });
  };

  // copy/paste from signup
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

  const loadingMessage = () => {
    return loading && <div className="alert alert-info">Loading...</div>;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            error: "",
            loading: false,
            didRedirect: true,
          });
        });
      }
    });
    // .catch(console.log("Sign in request FAILED")); DEBUG: for unwanted console log
  };

  const performRedirect = () => {
    if (didRedirect) {
      // TODO: redirect needs work here - DONE:
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            {/* <form onSubmit={handleSubmit}> */}
            {/* <Form onSubmit={handleSubmit}> */}
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
                className="btn btn-outline-success"
                type="button"
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
    <Base title="signin page" description="a page for user to signin!">
      {/* <h3 className="text-white">Signin Works</h3> */}
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
      <p className="text-center text-white">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
