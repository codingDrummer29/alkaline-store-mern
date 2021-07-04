// /* eslint-disable array-callback-return */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { isAuthenticated } from "../../auth/helper";
// import { emptyCart, loadLocalItem } from "../helper/carthelper";
// import { createOrder } from "../helper/orderhelper";
// import { getMeToken, processPayment } from "../helper/paymentbhelper";
// import DropIn from "braintree-web-drop-in-react";

// const PaymentBrainT = ({
//   products,
//   setReload = (f) => f,
//   reload = undefined,
//   instance,
// }) => {
//   const [info, setInfo] = useState({
//     loading: false,
//     success: false,
//     clientToken: null,
//     error: "",
//   });

//   const userId = isAuthenticated() && isAuthenticated().user._id;
//   const token = isAuthenticated() && isAuthenticated().token;

//   const getToken = (userId, token) => {
//     getMeToken(userId, token).then((info) => {
//       console.log("INFORMATION: ", info);
//       if (info.error) {
//         setInfo({ ...info, error: info.error });
//       } else {
//         const clientToken = info.clientToken;
//         setInfo({ clientToken });
//       }
//     });
//   };

//   useEffect(() => {
//     getToken(userId, token);
//   }, []);

//   const getAmount = () => {
//     let amount = 0;
//     // let amount = 0;
//     // products.map((p) => {
//     //   amount = amount + p.price;
//     // });
//     return amount;
//   };

//   const onPurchase = () => {
//     setInfo({ ...info, loading: true });
//     let nonce;
//     let getNonce = info?.instance
//       ?.requestPaymentMethod()
//       .then((data) => {
//         nonce = data?.nonce;
//         const paymentInfo = {
//           paymentMethodNonce: nonce,
//           amount: getAmount(),
//         };
//         processPayment(userId, token, paymentInfo)
//           .then((response) => {
//             setInfo({ ...info, loading: false, success: response.success });
//             console.log("PAYMENT SUCCESS");
//             const orderData = {
//               products: products,
//               transaction_id: response.transaction.id,
//               amount: response.transaction.amount,
//             };
//             createOrder(userId, token, orderData);
//             emptyCart(() => {
//               console.log("Did we got a crash?");
//             });

//             setReload(!reload);
//           })
//           .catch((err) => {
//             setInfo({ loading: false, success: false });
//             console.log("PAYMENT FAILED");
//           });
//       })
//       .catch();
//   };

//   const showBTDropIn = () => {
//     return (
//       <div>
//         {info.clientToken !== null && getAmount !== 0 ? (
//           // {info.clientToken !== null && products.length > 0 ? (
//           <div>
//             <DropIn
//               options={{ authorization: info.clientToken }}
//               onInstance={(instance) => (info.instance = instance)}
//             />
//             <div className="d-grid">
//               <button className="btn btn-success" onClick={onPurchase}>
//                 Buy
//               </button>
//             </div>
//           </div>
//         ) : (
//           <h3>Please Signin or add something to cart</h3>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h3>Your Bill is: $ {getAmount()}</h3>
//       {showBTDropIn()}
//     </div>
//   );
// };

// export default PaymentBrainT;
