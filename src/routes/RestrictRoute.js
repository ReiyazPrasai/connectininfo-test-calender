import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from '../utils/authUtil';

const RestrictRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect
          to={{
            pathname: '/admin/dashboard',
            state: { from: props.location },
          }}
        />
      ) : (
          <Component {...props} />
      )
    }
  />
);

export default RestrictRoute;
