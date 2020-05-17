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
import CustomerAccount from "./pages/CustomerAccount/account";
import DeleteProduct from "./pages/AdminPage/deleteProduct";
import AddProduct from "./pages/AdminPage/addProduct";
import UpdateProduct from "./pages/AdminPage/updateProduct";

const Router = (props) => (
  <>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/Smartphones' component={Smartphones} />
      <Route exact path='/Monitor' component={Monitor} />
      <Route path='/Computer' component={Computers} />
      <Route exact path='/Login' component={Login} />
      <Route exact path='/SignUp' component={SignUp} />
      <Route exact path='/search/:Title' component={SearchPage} />

      <Route path='/callback' component={CallBack} />
      <PrivateRoute
        exact
        path='/customer/account'
        component={CustomerAccount}
      />
      <Route path='/Product/:id' component={Details} />

      <PrivateRoute exact path='/Cart' component={Carts} />
      <Route
        exact
        path='/productAdd'
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
      <Route
        exact
        path='/productDelete'
        render={() =>
          new Auth().isAuthenticate() && new Auth().isAdmin() ? (
            <DeleteProduct />
          ) : (
            <Redirect to='/' />
          )
        }
      />
    </Switch>
  </>
);

export default Router;
