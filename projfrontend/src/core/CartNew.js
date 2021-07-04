/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
// import { API } from "../backend";

import Base from "./Base";
import Card from "./components/Card";
import { loadLocalItem } from "./helper/carthelper";
import BTCheckout from "./paymentGateway/BTCheckout";

const CartNew = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllPRoducts = (products) => {
    return (
      <div>
        <h2>This section loads products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              localproduct={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
        <BTCheckout
          localproducts={products}
          setPageReload={setReload}
          pageReload={reload}
        />
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadLocalItem());
  }, [reload]);

  return (
    <Base
      title="AlkaLine - NewCart Page"
      description="welcome to the Tshirt Store"
    >
      <div className="container bg-dark text-white text-center">
        <h2 className="display-5 mb-3">All Of Tshirts</h2>
        <div className="row">
          {/* <div className="col-6">{loadAllPRoducts(products)}</div> */}
          <div className="col-6">
            {products.length > 0 ? (
              loadAllPRoducts(products)
            ) : (
              <h3>No Products in your Cart</h3>
            )}
          </div>
          <div className="col-6">{loadCheckout()}</div>

          {/* {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card localproduct={product} />
              </div>
            );
          })} */}
        </div>
      </div>
    </Base>
  );
};

export default CartNew;
