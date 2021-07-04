/**
 * stripe implemented & removes from frontend
 */

// /* eslint-disable array-callback-return */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { isAuthenticated } from "../../auth/helper";
// import { emptyCart, loadLocalItem } from "../helper/carthelper";
// import Stripecheckout from "react-stripe-checkout";
// import { API } from "../../backend";
// import { createOrder } from "../helper/orderhelper";

// const StripeCheckout = ({
//   products,
//   setReload = (f) => f,
//   reload = undefined,
// }) => {
//   const [data, setData] = useState({
//     loading: false,
//     success: false,
//     error: "",
//     address: "",
//   });

//   const token = isAuthenticated() && isAuthenticated().token;
//   const userId = isAuthenticated() && isAuthenticated().user._id;

//   const getFinalPrice = () => {
//     let amount = 0;
//     products.map((product) => {
//       amount = amount + product.price;
//     });
//     return amount;
//   };

//   const makePayment = (token) => {
//     const body = {
//       token,
//       products,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     return fetch(`${API}/stripepayment`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         console.log(response);
//         // call further methods
//         const { status } = response;
//         console.log("STATUS: ", status);
//         emptyCart();
//       })
//       .catch((err) => console.log(err));
//   };

//   const showStripeButon = () => {
//     return isAuthenticated() ? (
//       <Stripecheckout
//         stripeKey="pk_test_51J6oZOSDKHlXT1F9FMW1SzKcjhasU7YND4SXUpa31cBOeHzecszXcrcFHv9ICm9S6HI28guIyaF1DcWTAGxql5ps00u3NvK9yI"
//         token={makePayment}
//         amount={getFinalPrice() * 100}
//         name="Complete Checkout"
//         shippingAddress
//         billingAddress
//       >
//         <button className="btn btn-success">Pay With Stripe</button>
//       </Stripecheckout>
//     ) : (
//       <Link to="/signin">
//         <button className="btn btn-warning">Sign In</button>
//       </Link>
//     );
//   };

//   return (
//     <div>
//       <h3 className="text-white">Stripe Checkut {getFinalPrice()}</h3>
//       {showStripeButon()}
//     </div>
//   );
// };

// export default StripeCheckout;
