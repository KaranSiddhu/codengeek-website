import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getLoggedIn = async () => {
    const { data } = await axios.get("/api/v1/auth/loggedin");
    setLoggedIn(data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
    {children}
  </AuthContext.Provider>;
};

export default AuthContext;
