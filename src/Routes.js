import React, { useContext } from "react";
//* Routing
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthRoute from "./components/routing/AuthRoute";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LogInScreen from "./pages/LogIn/LogInScreen";
import RegisterScreen from "./pages/Register/RegisterScreen";
import ForgotPasswordScreen from "./pages/Forgot password/ForgotPasswordScreen";
import PasswordResetScreen from "./pages/Password reset/PasswordResetScreen";
import HomeScreen from "./pages/Home/HomeScreen";
import ProfilePage from "./pages/profile/ProfilePage";
import AuthContext from "./context/AuthContext";

const Routes = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeScreen} />

        {/* <PrivateRoute path="/user/profile" exact component={ProfilePage} /> */}

        {loggedIn && <Route path="/user/profile" exact component={ProfilePage} />}

        {/* <AuthRoute path="/login" exact component={LogInScreen} />

        <AuthRoute path="/register" exact component={RegisterScreen} /> */}

        <Route path="/forgotpassword" exact component={ForgotPasswordScreen} />

        <Route path="/passwordreset/:resetToken" exact component={PasswordResetScreen} />

        {!loggedIn ? (
          <>
            <Route path="/login" exact component={LogInScreen} />

            <Route path="/register" exact component={RegisterScreen} />
          </>
        ) : (
          <Redirect to='/' />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
