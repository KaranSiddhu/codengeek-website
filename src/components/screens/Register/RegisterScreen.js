import React,{ useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "../../card/MyCard";
import Particle from "../../Particles";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import "./RegisterScreen.css";

const RegisterScreen = () => {

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
    <div className="register-container">
      <Particle />

      <div className="register-card">
        <MyCard title="Register">
          <form className="register-form">
            <div className="form-field">
              <label htmlFor="name">Username:</label>
              <input name="name" required type="text" id="name" placeholder="Enter username" />
            </div>

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

            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                id="password"
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
              Already have an account?  <Link to="/login" className='register-link'>Login</Link>
            </span>

          </form>
        </MyCard>
      </div>
    </div>
  );
};

export default RegisterScreen;
