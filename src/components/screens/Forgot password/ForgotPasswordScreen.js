import React from "react";
import "./ForgotPassword.css";
import Particle from "../../Particles";
import MyCard from "../../card/MyCard";

const ForgotPasswordScreen = () => {
  return (
    <div className="forgotpass-container">
      <Particle />

      <div className="forgotpass-card">
        <MyCard title="Forgot Password">
          <form className="forgotpass-form">

          <p className='fogotpass-text'>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                name="email"
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

          
        </MyCard>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
