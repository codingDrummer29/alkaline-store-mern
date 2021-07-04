// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles.css";
// // import { API } from "../backend";

// import Base from "./Base";
// import Card from "./components/Card";
// import { loadLocalItem } from "./helper/carthelper";
// import PaymentBrainT from "./paymentGateway/PaymentBrainT";
// // import StripeCheckout from "./paymentGateway/StripeCheckout";

// const Cart = () => {
//   const [products, setProducts] = useState([]);
//   const [reload, setReload] = useState(false);

//   useEffect(() => {
//     setProducts(loadLocalItem());
//   }, [reload]);

//   const loadAllProducts = (products) => {
//     return (
//       <div className="">
//         <h2 className="display-5">Cart Items</h2>
//         {products?.map((product, index) => {
//           return (
//             <>
//               <Card
//                 key={index}
//                 localproduct={product}
//                 addToCart={false}
//                 removeFromCart={true}
//                 reload={reload}
//                 setReload={setReload}
//               />
//               <br />
//             </>
//           );
//         })}
//       </div>
//     );
//   };

//   // const checkoutAllProducts = () => {
//   //   return (
//   //     <div className="">
//   //       <h2 className="display-5">Check-Out</h2>
//   //     </div>
//   //   );
//   // };

//   return (
//     <Base
//       title="Cart Page"
//       description="see what you have decided to purchase and put in cart"
//     >
//       <div className="container bg-dark text-white text-center">
//         <div className="row">
//           <div className="col-6">
//             {products}
//             {products?.length > 0 ? (
//               loadAllProducts(products)
//             ) : (
//               <h3>No Products to show</h3>
//             )}
//           </div>
//           <div className="col-6">
//             <PaymentBrainT products={products} setReload={setReload} />
//           </div>
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default Cart;
