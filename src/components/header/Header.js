import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "./../../assets/logo192.png";
import AuthContext from "../../context/AuthContext";

import "./Header.css";
import { BiMenu } from "react-icons/bi";
import Avatar from "react-avatar";

const Header = ({ history }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { loggedIn, userData } = useContext(AuthContext);

  const currentTab = (path) => {
    if (history.location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { textDecoration: "none" };
    }
  };

  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          {/* <NavLink to="/" exact activeClassName="active-class"> */}
          <a href="/">
            <img src={logo} alt="LOGO" />
          </a>  
          
          {/* </NavLink> */}
        </section>

        <section 
          className="header-top__navbar" 
          id={showNavBar ? "increase_height" : ""}
        >
          <BiMenu className="bread-button" onClick={() => setShowNavBar(!showNavBar)} />

          <section className="header-top__navigation" id={showNavBar ? "hidden_navbar" : ""}>
            <div className="navbar-item">
              <NavLink
                to="/"
                style={currentTab("/")}
                exact
                className="navbar-hover"
                activeClassName="active-class"
              >
                Home
              </NavLink>
            </div>

            {!loggedIn && (
              <>
                <div className="navbar-item">
                  <NavLink
                    to="/login"
                    style={currentTab("/login")}
                    exact
                    className="navbar-hover"
                    activeClassName="active-class"
                  >
                    login
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink
                    to="/register"
                    style={currentTab("/register")}
                    exact
                    className="navbar-hover"
                    activeClassName="active-class"
                  >
                    register
                  </NavLink>
                </div>
              </>
            )}

            {loggedIn && (
              <>
                <div className="navbar-item">
                  <NavLink
                    to="/user/profile"
                    exact
                    className="navbar-hover hidden-text"
                    style={currentTab("/user/profile")}
                  >
                    Profile
                  </NavLink>

                  <NavLink to="/user/profile" exact className="profile-active-class">
                    <Avatar name={userData.fullName} size="37" round={true} textSizeRatio={0} />
                  </NavLink>
                </div>
              </>
            )}
          </section>

          <hr className="header-top__seperator" />
        </section>
      </section>
    </section>
  );
};

export default withRouter(Header);
