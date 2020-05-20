import React from "react";
import { withRouter, Switch } from "react-router-dom";

import RestrictRoute from "../../routes/RestrictRoute";
import PrivateRoute from "../../routes/PrivateRoute";

import {
  AsyncLayout,
  AsyncLoginForm,
  AsyncDashboard,
  AsyncBooking,
  AsyncRoom,
  AsyncFood,
  AsyncStaff,
  AsyncRate,
  AsyncPrice,
  AsyncProperty,
  AsyncFacility,
  AsyncCalendar,
  AsyncProfile,
} from "./AsyncComponent";

const App = () => (
  <React.Fragment>
    <Switch>
      <RestrictRoute exact path="/" component={AsyncLoginForm} />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/dashboard"
        component={AsyncDashboard}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/booking"
        component={AsyncBooking}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/room"
        component={AsyncRoom}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/food"
        component={AsyncFood}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/staff"
        component={AsyncStaff}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/rate"
        component={AsyncRate}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/price"
        component={AsyncPrice}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/property"
        component={AsyncProperty}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/facility"
        component={AsyncFacility}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/calendar"
        component={AsyncCalendar}
      />
      <PrivateRoute
        exact
        layout={AsyncLayout}
        path="/profile"
        component={AsyncProfile}
      />
    </Switch>
  </React.Fragment>
);
export default withRouter(App);
