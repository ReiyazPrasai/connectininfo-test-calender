import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../utils/authUtil";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(rest);
        if (!isAuthenticated()) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else if (
          rest.path === "/" ||
          rest.path === "/admin" ||
          rest.path === "/admin/"
        ) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/admin/dashboard",
                state: { from: props.location },
              }}
            />
          );
        }

        // authorised so return component
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default PrivateRoute;
