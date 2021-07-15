import React from "react";
import Routes from "./Routes";
import { AuthContextProvider } from "./context/AuthContext";



const App = () => {

  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
};

export default App;
