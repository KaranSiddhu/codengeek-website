import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/logo192.png";
import "./Header.css";
import Navbar from "../navbar/Navbar";
const Header = () => {
  return (
    <section className="header">

      <section className="header-top">
    
        <section className="header-top__logo">
          <NavLink to="/" exact activeClassName="active-class">
            <img src={logo} alt="LOGO" />
          </NavLink>
        </section>
    
        <section className="header-top__navbar">
    
          <section className="header-top__navigation">
            <Navbar />
          </section>
    
          <hr className="header-top__seperator" />
    
        </section>
    
      </section>
    
    </section>

    // <div className="header-container">
    //   <NavLink to="/" exact activeClassName="active-class">
    //     <img src={logo} alt="LOGO" />
    //   </NavLink>

    //   <ul className="nav-items">
    //     <li className="nav-item">
    // <NavLink to="/" exact activeClassName="active-class">
    //   Home
    // </NavLink>
    //     </li>
    //     <li className="nav-item">
    //       <NavLink to="/login" exact activeClassName="active-class">
    //         login
    //       </NavLink>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Header;
