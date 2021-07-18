import React, { useContext } from "react";
//* Routing
// import PrivateRoute from "./components/routing/PrivateRoute";
import AuthRoute from "./components/routing/AuthRoute";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogInScreen from "./pages/LogIn/LogInScreen";
import RegisterScreen from "./pages/Register/RegisterScreen";
import ForgotPasswordScreen from "./pages/Forgot password/ForgotPasswordScreen";
import PasswordResetScreen from "./pages/Password reset/PasswordResetScreen";
import HomeScreen from "./pages/Home/HomeScreen";
import ProfilePage from "./pages/profile/ProfilePage";
import AuthContext from "./context/AuthContext";
import EmailVerify from "./pages/Verify email/EmailVerify";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DisplayPost from "./pages/Single Post/DisplayPost";
import Createpost from "./pages/create post/Createpost";

const Routes = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeScreen} />

        {loggedIn && <Route path="/user/profile" exact component={ProfilePage} />}

        <AuthRoute path="/login" exact component={LogInScreen} />

        <AuthRoute path="/register" exact component={RegisterScreen} />

        <Route path="/forgotpassword" exact component={ForgotPasswordScreen} />

        <Route path="/passwordreset/:resetToken" exact component={PasswordResetScreen} />

        <Route path="/email/verify/:verifyEmailToken" exact component={EmailVerify} />

        <Route path="/post/:postId" exact component={DisplayPost} />

        {loggedIn && <Route path="/create/post" exact component={Createpost} />}
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Routes;
