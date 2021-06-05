import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//* screens
import LogInScreen from "./components/screens/LogIn/LogInScreen";
import RegisterScreen from "./components/screens/Register/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/Forgot password/ForgotPasswordScreen";
import PasswordResetScreen from "./components/screens/Password reset/PasswordResetScreen";
import HomeScreen from "./components/screens/Home/HomeScreen";

//* Routing
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LogInScreen} />

        <Route path="/register" exact component={RegisterScreen} />

        <Route path="/forgotpassword" exact component={ForgotPasswordScreen} />

        <Route path="/passwordreset/:resetToken" exact component={PasswordResetScreen} />

        <PrivateRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
