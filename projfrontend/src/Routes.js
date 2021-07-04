/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import CartNew from "./core/CartNew";
// import Cart from "./core/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/yourcart" component={CartNew} />
        {/* <Route exact to="/cart" component={Cart} /> */}
        <PrivateRoutes exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoutes exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoutes
          exact
          path="/admin/category/create"
          component={AddCategory}
        />
        <AdminRoutes
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoutes
          exact
          path="/admin/product/create"
          component={AddProduct}
        />
        <AdminRoutes exact path="/admin/products" component={ManageProducts} />
        <AdminRoutes
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
