import { Route, Redirect } from "react-router-dom";
import React from "react";

import Auth from "./Auth";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      new Auth().isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/Login",
          }}
        />
      )
    }
  />
);
export default PrivateRoute;
