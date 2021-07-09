import React from "react";
import axios from "axios";
import Routes from "./Routes";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

const App = () => {

  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

export default App;
