/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emptyCart, loadLocalItem } from "../helper/carthelper";
import { getMeToken, processPayment } from "../helper/paymentbhelper";
import { createOrder } from "../helper/orderhelper";
import { isAuthenticated } from "../../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BTCheckout = ({
  localproducts,
  setPageReload = (f) => f,
  pageReload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((data) => {
      //   console.log("INFORMATION: ", data);
      if (data.error) {
        setInfo({ ...info, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ ...info, clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    localproducts.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info?.instance?.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, loading: false, success: response.success });
          console.log("PAYMENT SUCCESS");
          const ordersData = {
            products: localproducts,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          //   createOrder(userId, token, ordersData);
          emptyCart(() => {
            console.log("Did we got a crash?");
          });
          setPageReload(!pageReload);
        })
        .catch((err) => {
          setInfo({ ...info, loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const showBTDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && localproducts.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <div className="d-grid">
              <button onClick={onPurchase} className="btn btn-success">
                Buy with BT
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h5>Loading...</h5>
            <span>Please Signin or Add Product to Cart</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h4>Braintree Gateway Checkout</h4>
      <h5>Bill Amount: $ {getAmount()}</h5>
      {showBTDropIn()}
    </div>
  );
};

export default BTCheckout;
