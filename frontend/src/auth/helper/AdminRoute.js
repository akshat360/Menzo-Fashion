import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../../user/helper/userapicalls';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
