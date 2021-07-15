import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";
import Toast from "../../components/toast/Toast";
import { showToast } from "../../components/toast/helper/toastHelper";
import { API } from "../../api/backendApi";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const ProfilePage = ({ history }) => {
  // const [error, setError] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([]);
  let toastProperties = null;

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  console.log("LOGGED IN or not -", loggedIn);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API}/private`);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      console.log("DATA", data.user);
      setUserData(data.user);
    } catch (ere) {
      console.log("ERROR", ere);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = async () => {
    console.log("SIGN OUT");
    
    try {
      const { data } = await axios.get(`${API}/auth/signout`);
      console.log("DATa", data);
      await getLoggedIn();
    } catch (err) {
      console.log(err);
    }

    history.push("/login");

  };

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

  const leftSection = () => {
    return (
      <div className="user_navigation_con">
        <p className="heading_profile">User Navigation</p>
        <hr className="profile_page_seperator" />

        <ul className="navigation_list_group">
          <li className="navigation_list_group_item">
            <a href="#">Edit Profile</a>
          </li>

          <li className="navigation_list_group_item">
            <a href="#">Create Blog</a>
          </li>
          
          <li className="navigation_list_group_item">
            <a href="#" onClick={handleSignOut} >Sign Out</a>
          </li>
        </ul>
      </div>
    );
  };

  const rightSection = () => {
    return (
      <>
        <p className="heading_profile">User Information</p>

        <hr className="profile_page_seperator" />

        <ul className="profile_list_group">
          <li className="profile_list_group_item">
            <span>Name: </span>
            {userData.fullName}
          </li>

          <li className="profile_list_group_item">
            <span>Email: </span>
            {userData.email}

            {userData.isEmailVerified ? (
              <TiTick  />
            ) : (
              <ul className="verify_email_link_list">
                <li>
                  Email is not verified.&nbsp;
                  <a
                    href="#"
                    onClick={handleVerifyEmail}
                    className="verify_email_span"
                    
                  >
                    Verify Email
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </>
    );
  };

  const profilePageContent = () => {
    return (
      <div className="grid_background">
        <div className="grid_container">
          <div className="grid_item">{leftSection()}</div>

          <div className="grid_item">{rightSection()}</div>
        </div>

        {/* {userData ? <h2>{userData.email}</h2> : ""}

        {userData.isEmailVerified ? <h2>Email is verified</h2> : <h2>Email is not verified</h2>}

        {!userData.isEmailVerified ? <button onClick={handleVerifyEmail}>Verify Email</button> : ""}

        <button onClick={handleSignOut}>Sign out</button> */}
      </div>
    );
  };

  return (
    <div className="profile_page_container">
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />

      {loading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        profilePageContent()
      )}
    </div>
  );
};

export default ProfilePage;
