import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MyCard from "../../components/card/MyCard";
import Particle from "../../components/Particles";
import "./RegisterScreen.css";
import axios from "axios";
import Toast from "../../components/toast/Toast";
import { showToast } from "../../components/toast/helper/toastHelper";

import AuthContext from "../../context/AuthContext";
import { API } from "../../api/backendApi";

const RegisterScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  console.log('Logged In - ', loggedIn);

  const [list, setList] = useState([]);
  let toastProperties = null;


  const registerHandler = async (e) => {
    e.preventDefault();

    if (fullName.length < 5) {
      toastProperties = showToast("error", "Name is less than 5 characters");

      return setList([...list, toastProperties]);
    }

    if (password.length < 6) {
      toastProperties = showToast("error", "Password is less than 6 characters");

      return setList([...list, toastProperties]);
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      toastProperties = showToast("error", "Passwords do not match");

      return setList([...list, toastProperties]);
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(
        `${API}/auth/register`,
        { fullName, email, password },
        config
      );
      console.log("DATA", data);

      await getLoggedIn();
      
     
      history.push("/");

      
    } catch (err) {
      toastProperties = showToast("error", err.response.data.message);
      console.log("ERROR - ", err.response.data.error);
      setList([...list, toastProperties]);
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
        <div className="form-field">
          <label htmlFor="name">Full name:</label>
          <input
            name="name"
            required
            type="text"
            id="name"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

      <Toast toastList={list} autoDelete={true} dismissTime={3000} />

      <div className="register-card">
        <MyCard title="Register">{registerForm()}</MyCard>
      </div>
    </div>
  );
};

export default RegisterScreen;
