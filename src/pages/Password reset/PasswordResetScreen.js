import React, { useState } from "react";
import "./PasswordReset.css";
import MyCard from "../../components/card/MyCard";
import Particle from "../../components/Particles";
import { Link, matchPath, Redirect } from "react-router-dom";
import axios from "axios";
import Toast from "../../components/toast/Toast";
import { showToast } from "../../components/toast/helper/toastHelper";

const PasswordResetScreen = ({ match, history }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [list, setList] = useState([]);
  let toastProperties = null;

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

    if((password.length < 6) && (confirmPassword.length < 6)){
      toastProperties = showToast("error", "Password is less than 6 characters");

      return setList([...list, toastProperties]);
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toastProperties = showToast("error", "Passwords do not match");

      return setList([...list, toastProperties]);
    }

    try {
      console.log("MATCH =", match);
      const { data } = await axios.put(
        `/api/v1/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );

      console.log("DATA =", data);
      
      toastProperties = showToast("success", data.message);
      setList([...list, toastProperties]);
      setTimeout(() => {
        history.push('/login');
      }, 2000);

    } catch (err) {
      toastProperties = showToast("error", err.response.data.error);
      setList([...list, toastProperties]);
    }
  };

  const passResetForm = () => {
    return (
      <form onSubmit={resetPassHandler} className="passreset-form">
      
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
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />

      <div className="passreset-card">
        <MyCard title="Reset Password">{passResetForm()}</MyCard>
      </div>
    </div>
  );
};

export default PasswordResetScreen;
