import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./HomeScreen.css";

const HomeScreen = ({ history }) => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  console.log("LOGGED IN -", loggedIn);

  const handleSignOut = async () => {
    const { data } = await axios.get("/api/v1/auth/signout");
    console.log("DATa", data);
    await getLoggedIn();

    history.push("/login");
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleProfilePage = () => {
    history.push("/user/profile");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div>
      <h1>Home</h1>
      {!loggedIn ? (
        <h1 style={{ color: "red" }}>You are not logged In</h1>
      ) : (
        <h1 style={{ color: "green" }}>You are logged In</h1>
      )}
      
      {!loggedIn && (
        <>
          <button onClick={handleLogIn}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </>
      )}
      {loggedIn  && (
        <>
          <button onClick={handleProfilePage}>Profile page</button>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
