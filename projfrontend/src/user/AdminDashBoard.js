/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";

import { isAuthenticated } from "../auth/helper/index";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white text-center">
          Admin Navigation
        </h4>
        <ul className="list-group">
          <li className="list-group-item text-center">
            <Link to="/admin/category/create" className="nav-link text-success">
              <i>Create Categories</i>
            </Link>
          </li>

          <li className="list-group-item text-center">
            <Link to="/admin/categories" className="nav-link text-success">
              <i>Manage Categories</i>
            </Link>
          </li>

          <li className="list-group-item text-center">
            <Link to="/admin/product/create" className="nav-link text-success">
              <i>Create Products</i>
            </Link>
          </li>

          <li className="list-group-item text-center">
            <Link to="/admin/products" className="nav-link text-success">
              <i>Manage Products</i>
            </Link>
          </li>

          <li className="list-group-item text-center">
            <Link to="/admin/orders" className="nav-link text-success">
              <i>Manage Orders</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white text-center">
          Admin Information
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge rounded-pill bg-success mr-2">Name: </span>
            <span className="mx-2 text-capitalize">{name}</span>
          </li>
          <li className="list-group-item">
            <span className="badge rounded-pill bg-success mr-2">Email : </span>
            <span className="mx-2">{email}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Base
        title="Admin Dashboard"
        description="Welcome to the Admin pannel. manage all your store here"
        className="container bg-success p-4"
      >
        <div className="row">
          <div className="col-4">{adminLeftSide()}</div>

          <div className="col-8">{adminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
};

export default AdminDashBoard;
