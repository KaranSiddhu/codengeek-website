import React, { useState, useEffect } from "react";
import "./EmailVerify.css";
import Particle from "../../components/Particles";
import MyCard from "../../components/card/MyCard";
import axios from "axios";
import Toast from "../../components/toast/Toast";

import { API } from "../../api/backendApi";
import { showToast } from "../../components/toast/helper/toastHelper";

const EmailVerify = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [list, setList] = useState([]);
  let toastProperties = null;

 

  useEffect(() => {

    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`${API}/auth/email/verify/${match.params.verifyEmailToken}`);
        console.log("DATA", data);
        if (data.success) {
          setIsLoading(false);
          toastProperties = showToast("success", data.message);
          setList([...list, toastProperties]);
        
        }
      } catch (err) {
        setIsLoading(true);
        console.log("ERROR - ", err.response.data.error);
        toastProperties = showToast("error", "Something went wrong please try again later.");
        setList([...list, toastProperties]);
      }
    };

    verifyEmail();
  }, []);

  const handleContinueBtn = () => {
    history.push('/');
  };

  const loadingMessage = () => {
    return (
      <div className="emailCard-content">
        {isLoading ? (
          <h3>Please wait...</h3>
        ) : (
          <div>
            <h3 style={{color:'#25c38a'}}>Thank You</h3>
            <p style={{ marginTop: "10px" }}>You have verified your email</p>
            <button className="btn btn-primary" onClick={handleContinueBtn}>
              Continue
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="emailverify-container">
      <Particle />
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />
      <div className="email-card">
        <MyCard title="">{loadingMessage()}</MyCard>
      </div>
    </div>
  );
};

export default EmailVerify;
