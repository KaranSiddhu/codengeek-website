import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { API } from "../api/backendApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");



  const getLoggedIn = async () => {
    const { data } = await axios.get(`${API}/auth/loggedin`);
    setLoggedIn(data);
  };

  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API}/private`);
  
      console.log("DATA from context", data.user.fullName);
      setUserData(data.user.fullName);
    } catch (ere) {
      console.log("ERROR", ere);
      setError(ere);
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  useEffect(() => {
    if(loggedIn){
      console.log("IF data", userData);
      fetchData();
    }
  },[loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userData, fetchData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
