import React, { useState } from "react";
import "./ForgotPassword.css";
import MyCard from "../../components/card/MyCard";
import axios from "axios";
import Particle from '../../components/Particles';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPassHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post("/api/v1/auth/forgotpassword", { email }, config);

      console.log("DATA - ",data);
      setSuccess(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const forgotPassForm = () => {
    return (
      <form onSubmit={forgotPassHandler} className="forgotpass-form">
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}

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

      <div className="forgotpass-card">
        <MyCard title="Forgot Password">{forgotPassForm()}</MyCard>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
