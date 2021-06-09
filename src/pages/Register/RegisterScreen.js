import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyCard from "../../components/card/MyCard";
import Particle from '../../components/Particles';
import "./RegisterScreen.css";
import axios from "axios";
import { authenticate, isAuthenticate } from "../../auth/authHelper";

const RegisterScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  
  useEffect(() => {
    if(isAuthenticate()){
      history.push('/');
    }
  }, [history])

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

    try {
      const { data } = await axios.post(
        "/api/v1/auth/register",
        { userName, email, password },
        config
      );
      console.log("DATA", data);

      authenticate(data);
      history.push("/");
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  const handleOnCheckboxClick = () => {
    setIsChecked(!isChecked);
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const registerForm = () => {
    return (
      <form onSubmit={registerHandler} className="register-form">
        {error && <span className="error-message">{error}</span>}
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
        <MyCard title="Register">{registerForm()}</MyCard>
      </div>
    </div>
  );
};

export default RegisterScreen;
