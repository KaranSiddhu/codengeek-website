// NOTE This route is only for sign in and register page
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);


  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
