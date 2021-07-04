/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeCartItem } from "../helper/carthelper";
import CardImage from "./CardImage";

const Card = ({
  localproduct,
  addToCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
  //   setReload = function (f) { return f },
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(localproduct.count);

  const cardTitle = localproduct ? localproduct.name : "A Default Title";
  const cardDescription = localproduct
    ? localproduct.description
    : "A Default Product Description";
  const cardPrice = localproduct ? localproduct.price : "5";

  const addPageItemToCart = () => {
    addItemToCart(localproduct, () => setRedirect(true));
  };

  const getARedirect = (resRedirect) => {
    if (resRedirect) {
      return <Redirect to="/yourcart" />;
      // return <Redirect to="/" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addPageItemToCart}
          className="btn btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeCartItem(localproduct._id);
            setReload(!reload);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-warning ">
      <div className="card-header lead text-capitalize">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <CardImage product={localproduct} />
        <p className="lead bg-success font-weight-normal text-wrap mt-2 rounded">
          <span className="p-2">{cardDescription}</span>
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row text-center">
          <div className="col-12 d-grid">{showAddToCart(addToCart)}</div>
          <div className="col-12 d-grid">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
