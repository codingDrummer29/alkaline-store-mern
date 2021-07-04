/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link
          className="btn btn-outline-danger btn-sm mb-3"
          to="/admin/dashboard"
        >
          Back to Admin Dashboard
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group bg-dark text-white">
          <p className="lead">
            <b>Enter A Category</b>
          </p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For example Summer"
            onChange={handleChange}
            value={name}
          />
          <button onClick={handleSubmit} className="btn btn-outline-warning">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  return (
    <Base
      title="create category"
      description="add a new category for new tshirts"
      className="container bg-success p-4"
    >
      <div className="row bg-dark rounded">
        <div className="col-md-4 text-center p-4">
          {goBack()}
          <p className="text-warning">You Entered: {name}</p>
          {/* <p className="text-center text-white">{JSON.stringify(name)}</p> */}
        </div>

        <div className="col-md-8  p-4">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
