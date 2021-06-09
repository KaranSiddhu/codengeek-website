import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { authenticate, isAuthenticate } from "../../auth/authHelper";
import "./HomeScreen.css";

const HomeScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");

  const fetchData = async () => {
    const token = isAuthenticate();
    console.log(token.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`
      }
    };

    try {
      const { data } = await axios.get("/api/v1/private", config);
      console.log("DATA", data);
      setUserData(data);
    } catch (ere) {
      console.log("ERROR", ere);
    }
  };

  useEffect(() => {
    if (!isAuthenticate()) {
      history.push("/login");
    }

    fetchData();
  }, [history]);

  return (
    <div>
      <h1>Home{userData.data}</h1>
    </div>
  );
};

export default HomeScreen;
