/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    updatedProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    updatedProduct,
    getaRedirect,
    formData,
  } = values;
  //   photo,

  const goBack = () => {
    return (
      <div className="mt-3">
        <Link
          className="btn btn-outline-danger btn-sm mb-3"
          to="/admin/products"
        >
          Back to All Products
        </Link>
      </div>
    );
  };

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            getaRedirect: true,
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            updatedProduct: data.name,
            getaRedirect: true,
          });
        }
      }
    );
  };

  const successMessage = () => {
    if (updatedProduct) {
      setTimeout(() => {
        history.push("/admin/products");
        // window.location.replace("/admin/products");
      }, 4000);
    }
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: updatedProduct ? "" : "none" }}
      >
        <h4>{updatedProduct} updatedted successfully</h4>
      </div>
    );
  };

  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: !updateProduct ? "" : "none" }}
    >
      <h4>Failed to updatete {updatedProduct}</h4>
    </div>
  );

  const productForm = () => {
    return (
      <form>
        <div className="form-group bg-success py-2">
          <span className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="Choose a file"
            />
          </span>
        </div>
        <div className="form-group py-2">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Product Name"
            value={name}
          />
        </div>
        <div className="form-group py-2">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Product Description"
            value={description}
          />
        </div>
        <div className="form-group py-2">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Enter Price"
            value={price}
          />
        </div>
        <div className="form-group py-2">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Choose Category"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group py-2">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Enter Quantity"
            value={stock}
          />
        </div>
        <div className="form-group text-center py-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-outline-warning "
          >
            Update Product
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Product"
      description="update existing tshirt's details here"
      className="container bg-dark p-4"
    >
      <div className="row bg-dark rounded">
        <span className="mx-3">{goBack()}</span>

        <div className="col-md-8 offset-md-2 bg-success p-4">
          {successMessage()}
          {warningMessage()}
          {productForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
