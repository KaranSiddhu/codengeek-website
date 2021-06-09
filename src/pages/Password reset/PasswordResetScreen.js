import React, { useState } from "react";
import "./PasswordReset.css";
import MyCard from "../../components/card/MyCard";
import Particle from '../../components/Particles';
import { Link, matchPath } from "react-router-dom";
import axios from "axios";

const PasswordResetScreen = ({ match }) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOnCheckboxClick = () => {
    setIsChecked(!isChecked);
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetPassHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      console.log("MATCH =", match);
      const { data } = await axios.put(
        `/api/v1/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );


      console.log("DATA =", data);
      setSuccess(data.message);

    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  const passResetForm = () => {
    return (
      <form onSubmit={resetPassHandler} className="passreset-form">
        {error && <span className="error-message">{error}</span>}
        {success && (
          <span className="success-message">
            {success}. <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            required
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter new password"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Confirm Password:</label>
          <input
            name="password"
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm new password"
          />
        </div>
        <div className="check">
          <input
            type="checkbox"
            id="check-box"
            checked={isChecked}
            onChange={handleOnCheckboxClick}
          />
          <label htmlFor="checkbox" id="show-pass" onClick={handleOnCheckboxClick}>
            Show password
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    );
  };

  return (
    <div className="passreset-container">
      <Particle />

      <div className="passreset-card">
        <MyCard title="Reset Password">{passResetForm()}</MyCard>
      </div>
    </div>
  );
};

export default PasswordResetScreen;
