import React, { useState } from "react";
import "./ForgotPassword.css";
import MyCard from "../../components/card/MyCard";
import axios from "axios";
import Particle from "../../components/Particles";
import { showToast } from "../../components/toast/helper/toastHelper";
import Toast from "../../components/toast/Toast";
import { API } from "../../api/backendApi";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const [list, setList] = useState([]);
  let toastProperties = null;

  const forgotPassHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(`${API}/auth/forgotpassword`, { email }, config);

      // console.log("DATA - ", data);

      toastProperties = showToast("success", data.data);
      setList([...list, toastProperties]);
    } catch (err) {
      setEmail("");
      toastProperties = showToast("error", err.response.data.error);
      setList([...list, toastProperties]);
    }
  };

  const forgotPassForm = () => {
    return (
      <form onSubmit={forgotPassHandler} className="forgotpass-form">
        <p className="fogotpass-text">
          Please enter the email address you register your account with. We will send you reset
          password confirmation to this email
        </p>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            placeholder="Enter Email address"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    );
  };

  return (
    <div className="forgotpass-container">
      <Particle />
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />
      <div className="forgotpass-card">
        <MyCard title="Forgot Password">{forgotPassForm()}</MyCard>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
