import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAllowed } from '../utils/permissionUtil';
import { getLocalStorage } from '../utils/storageUtil';

const Authorization = ({ component: Component, rights, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // check if route is restricted by role
        // if (getLocalStorage(ENFORCE_PASSWORD_CHANGE) === true) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/profile/change-password',
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        // }
        // else if (!isAllowed(rights)) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/403',
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        // }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default Authorization;
