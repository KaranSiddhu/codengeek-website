import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//* screens
import LogInScreen from "./pages/LogIn/LogInScreen";
import RegisterScreen from "./pages/Register/RegisterScreen";
import ForgotPasswordScreen from "./pages/Forgot password/ForgotPasswordScreen";
import PasswordResetScreen from "./pages/Password reset/PasswordResetScreen";
import HomeScreen from "./pages/Home/HomeScreen";

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
