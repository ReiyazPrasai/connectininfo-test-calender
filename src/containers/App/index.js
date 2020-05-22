import React from "react";
import { withRouter, Switch } from "react-router-dom";

import RestrictRoute from "../../routes/RestrictRoute";
import PrivateRoute from "../../routes/PrivateRoute";

import AsyncComponent from "./AsyncComponent";

const RouteTo = (...params) => {
  const pathAndComponent = [...params];
  return pathAndComponent?.map((mainItem) => {
    const paths = [...mainItem[1]];
    return paths?.map((path) => {
      if (mainItem[2]) {
        return (
          <RestrictRoute exact path={`/${path}`} component={mainItem[0]} />
        );
      }
      return (
        <PrivateRoute
          exact={!path || path === "admin" || path === "admin/"}
          path={
            !path
              ? "/"
              : path === "admin" || path === "admin/"
              ? `/${path}`
              : `/admin/${path}`
          }
          layout={AsyncComponent[0]}
          component={mainItem[0]}
        />
      );
    });
  });
};

const App = () => (
  <React.Fragment>
    <Switch>{RouteTo(...AsyncComponent[2])}</Switch>
  </React.Fragment>
);
export default withRouter(App);
