import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { API } from "../api/backendApi";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userData, setUserData] = useState("");
  // const [error, setError] = useState("");

  const getLoggedIn = async () => {
    try {
      // console.log("GET LOGGED IN FUNCTION RUN");
      const { data } = await axios.get(`${API}/auth/loggedin`);
      setLoggedIn(data);
      setIsAuthenticating(false);
      // console.log("DATA OF AUTH CONTEXT - ", data);
    } catch (err) {
      setIsAuthenticating(false);

      console.log("AUTH CONTEXT ERROR - ", err);
    }
  };

  // console.log("AUTH CONTEXT - ", loggedIn);

  useEffect(() => {
    getLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/user`);

        // console.log("DATA from context", data.user.fullName);
        setUserData(data.user);
      } catch (ere) {
        console.log("ERROR", ere);
        // setError(ere);
      }
    };

    if (loggedIn) {
      // console.log("IF data", userData);
      fetchData();
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, isAuthenticating, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
