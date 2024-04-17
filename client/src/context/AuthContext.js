import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ id: "", username: "", iat: "", exp: "" })

  async function getLoggedIn() {
    try {
      const response = await axios.get("/api/loggedIn");
      
      setLoggedIn(response.data.logged);
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching logged-in status:", error);
    }
  }


  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };