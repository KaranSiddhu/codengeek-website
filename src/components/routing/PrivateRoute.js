import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn, isAuthenticating } = useContext(AuthContext);
  // console.log("LOGGED IN -", loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : !isAuthenticating && (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
