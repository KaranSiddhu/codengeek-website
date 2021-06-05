import React,{useState} from "react";
import "./LogInScreen.css";
import MyCard from "../../card/MyCard";
import Particle from "../../Particles";
import { Link } from "react-router-dom";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const LogInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassEyeIcon, setPassShowEyeIcon] = useState(false);

  const showPass = () => {
    setPassShowEyeIcon(!showPassEyeIcon);
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <Particle />

      <div className="login-card">
        <MyCard title="Login">
          <form className="login-form">
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
              <label htmlFor="password">
                Password:
                <Link to="/forgotpassword" className="login-screen__forgotpassword register-link">
                  Forgot Password?
                </Link>
              </label>
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
              />
              {showPassEyeIcon ? (
                <ImEyeBlocked onClick={showPass} className="login-showpass-icon" />
              ) : (
                <ImEye onClick={showPass} className="login-showpass-icon" />
              )}

            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>

            <span className="login-screen__subtext">
              Don't have an account?<Link to="/register" className='register-link'>Register</Link>
            </span>
          </form>
        </MyCard>
      </div>
    </div>
  );
};

export default LogInScreen;
