import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./HomeScreen.css";
import Particle from "../../components/Particles";
import { API } from "../../api/backendApi";

const HomeScreen = ({ history }) => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
console.log('HISTORY', history);
  console.log("LOGGED IN -", loggedIn);

  const handleSignOut = async () => {
    const { data } = await axios.get(`${API}/auth/signout`);

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
    <div className="homescreen-container">
      {/* <Particle /> */}
      <div className="home-content">
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
        {loggedIn && (
          <>
            <button onClick={handleProfilePage}>Profile page</button>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
