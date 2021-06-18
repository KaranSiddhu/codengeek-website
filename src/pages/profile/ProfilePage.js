import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = ({ history }) => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");

  const { loggedIn } = useContext(AuthContext);
  console.log("LOGGED IN or not -", loggedIn);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/v1/private");
      console.log("DATA", data);
      setUserData(data);
    } catch (ere) {
      console.log("ERROR", ere);
      setError(ere);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile page.</h1>
      {userData ? <h1>{userData.data}</h1> : ''}
      {error ? <h1>{error}</h1> : ''}
    </div>
  );
};

export default ProfilePage;
