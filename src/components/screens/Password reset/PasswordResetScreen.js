import React, { useState } from "react";
import "./PasswordReset.css";
import MyCard from "../../card/MyCard";
import Particle from "../../Particles";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const PasswordResetScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassEyeIcon, setPassShowEyeIcon] = useState(false);
  const [showConfirmPassEyeIcon, setConfirmPassShowEyeIcon] = useState(false);

  const showPass = () => {
    setPassShowEyeIcon(!showPassEyeIcon);
    setShowPassword(!showPassword);
  };

  const showConfirmPass = () => {
    setConfirmPassShowEyeIcon(!showConfirmPassEyeIcon);
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="passreset-container">
      <Particle />

      <div className="passreset-card">
        <MyCard title="Reset Password">
          <form className="passreset-form">
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter new password"
              />
              {showPassEyeIcon ? (
                <ImEyeBlocked onClick={showPass} className="showpass-icon" />
              ) : (
                <ImEye onClick={showPass} className="showpass-icon" />
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Confirm Password:</label>
              <input
                name="password"
                required
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                placeholder="Confirm new password"
              />
              {showConfirmPassEyeIcon ? (
                <ImEyeBlocked onClick={showConfirmPass} className="showconfirmpass-icon" />
              ) : (
                <ImEye onClick={showConfirmPass} className="showconfirmpass-icon" />
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </MyCard>
      </div>
    </div>
  );
};

export default PasswordResetScreen;
