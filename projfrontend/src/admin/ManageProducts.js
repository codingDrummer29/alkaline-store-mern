/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

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
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const removeProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <span className="mx-3">{goBack()}</span>
      <h3 className="mb-3 display-4 text-white">All products:</h3>
      <div className="row">
        <div className="col-12">
          <h4 className="text-center text-white my-3">Total 3 products</h4>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      removeProduct(product._id);
                    }}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
