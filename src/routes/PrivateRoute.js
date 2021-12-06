import React from 'react';
import { Route, Redirect } from 'react-router';
import store from '../store/index';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        store.getState().authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/authenticate', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
