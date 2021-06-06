import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "../../card/MyCard";
import Particle from "../../Particles";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import "./RegisterScreen.css";
import axios from "axios";
import { authenticate } from "../../../auth/authHelper";

const RegisterScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassEyeIcon, setPassShowEyeIcon] = useState(false);
  const [showConfirmPassEyeIcon, setConfirmPassShowEyeIcon] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const showPass = () => {
    setPassShowEyeIcon(!showPassEyeIcon);
    setShowPassword(!showPassword);
  };

  const showConfirmPass = () => {
    setConfirmPassShowEyeIcon(!showConfirmPassEyeIcon);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Passwords do not match");
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // try {
    // const { data } = axios.post("/api/v1/auth/register", { userName, email, password }, config);
    fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => console.log("DATA", data))
      .catch((err) => console.log("ERR", err));

    // localStorage.setItem("authToken", data.token);
    // history.push("/");
    // } catch (err) {
    //   console.log(err);
    //   setError(err.response.data.error);
    //   setTimeout(() => {
    //     setError("");
    //   }, 5000);
    // }
  };

  const registerForm = () => {
    return (
      <form onSubmit={registerHandler} className="register-form">
        <div className="form-field">
          <label htmlFor="name">Username:</label>
          <input
            name="name"
            required
            type="text"
            id="name"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            required
            type="email"
            value={email}
            id="email"
            placeholder="Enter Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            required
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {showPassEyeIcon ? (
            <ImEyeBlocked onClick={showPass} className="register-showpass-icon" />
          ) : (
            <ImEye onClick={showPass} className="register-showpass-icon" />
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Confirm Password:</label>
          <input
            name="password"
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          {showConfirmPassEyeIcon ? (
            <ImEyeBlocked onClick={showConfirmPass} className="register-showconfirmpass-icon" />
          ) : (
            <ImEye onClick={showConfirmPass} className="register-showconfirmpass-icon" />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </span>
      </form>
    );
  };

  return (
    <div className="register-container">
      <Particle />

      <div className="register-card">
        <MyCard title="Register">
          {error && <span>{error}</span>}
          {registerForm()}
        </MyCard>
      </div>
    </div>
  );
};

export default RegisterScreen;
