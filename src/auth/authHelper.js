export const authenticate = (data) => {
  
  if (typeof window !== "undefined" ) {
    localStorage.setItem("authToken", JSON.stringify(data));
    
  }
};

export const isAuthenticate = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("authToken")) {
    return JSON.parse(localStorage.getItem("authToken"));
  } else {
    return false;
  }
};
