import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";
import Toast from "../../components/toast/Toast";
import { showToast } from "../../components/toast/helper/toastHelper";
import { API } from "../../api/backendApi";

const ProfilePage = ({ history }) => {
  // const [error, setError] = useState("");
  // const [userData, setUserData] = useState("");

  const [list, setList] = useState([]);
  let toastProperties = null;

  const { loggedIn, userData } = useContext(AuthContext);
  console.log("LOGGED IN or not -", loggedIn);

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(`${API}/private`);
     
  
  //     console.log("DATA", data.user);
  //     setUserData(data.user);
  //   } catch (ere) {
  //     console.log("ERROR", ere);
  //     setError(ere);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleVerifyEmail = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(
        `${API}/auth/email/verify`,
        { email: userData.email },
        config
      );
      console.log("EMAIl - ", data);

      if (data.success) {
        toastProperties = showToast("success", data.message);

        return setList([...list, toastProperties]);
      }
    } catch (err) {
      toastProperties = showToast("error", "Something went wrong please try again");
      setList([...list, toastProperties]);
    }
  };

  return (
    <div>
      <h1>Profile page.</h1>
      {/* {userData ? <h1>{userData.data}</h1> : ""} */}
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />

      {/* {error ? <h1>{error}</h1> : ""} */}

      {userData ? <h2>{userData.email}</h2> : ""}

      {userData.isEmailVerified ? <h2>Email is verified</h2> : <h2>Email is not verified</h2>}

      {!userData.isEmailVerified ? <button onClick={handleVerifyEmail}>Verify Email</button> : ""}

      

    </div>
  );
};

export default ProfilePage;
