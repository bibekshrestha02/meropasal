import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./classes/privateRoute";
import Home from "./pages/Home";
import CallBack from "./classes/CallBack/callBack";
import Smartphones from "./pages/Smartphones";
import Monitor from "./pages/Monitors";
import Computers from "./pages/Computers";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/Signup";
import Carts from "./pages/Carts/Carts";
import Details from "./pages/Details/Details";
import SearchPage from "./pages/search/search";
import Auth from "./classes/Auth";
import Dashboard from "./pages/CustomerAccount/DashBoard";
import AddProduct from "./pages/AdminPage/addProduct";
import UpdateProduct from "./pages/AdminPage/updateProduct";
import CheckOut from "./pages/checkoutPage/CheckOut";
const Router = (props) => (
  <>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Mobile' component={Smartphones} />
      <Route path='/Monitor' component={Monitor} />
      <Route path='/Laptop' component={Computers} />
      <Route path='/Login' component={Login} />
      <Route path='/SignUp' component={SignUp} />
      <Route path='/search' component={SearchPage} />

      <Route path='/callback' component={CallBack} />
      <PrivateRoute path='/customer/account' component={Dashboard} />
      <Route path='/Product' component={Details} />

      <PrivateRoute path='/Cart' component={Carts} />
      <PrivateRoute path='/checkout' component={CheckOut} />

      <Route
        exact
        path='/AddProduct'
        render={() =>
          new Auth().isAuthenticate() && new Auth().isAdmin() ? (
            <AddProduct />
          ) : (
            <Redirect to='/' />
          )
        }
      />
      <Route
        exact
        path='/productUpdate/:id'
        render={() =>
          new Auth().isAuthenticate() && new Auth().isAdmin() ? (
            <UpdateProduct />
          ) : (
            <Redirect to='/' />
          )
        }
      />

      <Route path='*' component={Home} />
    </Switch>
  </>
);

export default Router;
