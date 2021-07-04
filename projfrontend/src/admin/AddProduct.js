/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const history = useHistory();
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
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const goBack = () => {
    return (
      <div className="mt-3">
        <Link
          className="btn btn-outline-danger btn-sm mb-3"
          to="/admin/dashboard"
        >
          Back to Admin Dashboard
        </Link>
      </div>
    );
  };

  const preload = () => {
    getAllCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        // FIXME: console.log("Categories Array: ", categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const successMessage = () => {
    if (createdProduct) {
      setTimeout(() => {
        history.push("/admin/products");
      }, 4000);
    }
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: !createdProduct && error !== "" ? "" : "none" }}
    >
      <h4>Failed to create {createdProduct}</h4>
    </div>
  );

  const productForm = () => {
    return (
      <form>
        <span className="text-warning">Post photo</span>
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
            Create Product
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Product"
      description="add new tshirts here"
      className="container bg-dark p-4"
    >
      <div className="row bg-dark rounded">
        <span className="mx-3">{goBack()}</span>

        <div className="col-md-8 offset-md-2 bg-success p-4">
          {successMessage()}
          {warningMessage()}
          {productForm()}
        </div>
        {/* <p className="text-center text-white">{JSON.stringify()}</p> */}
      </div>
    </Base>
  );
};

export default AddProduct;
