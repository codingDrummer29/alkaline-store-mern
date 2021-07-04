/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
// import { API } from "../backend";

import Base from "./Base";
import Card from "./components/Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllPRoducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllPRoducts();
  }, []);

  return (
    <Base title="AlkaLine" description="welcome to the Tshirt Store">
      <div className="container bg-dark text-white text-center">
        <h2 className="display-5 mb-3">All Of Tshirts</h2>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card localproduct={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
