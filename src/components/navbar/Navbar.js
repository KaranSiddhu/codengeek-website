import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="navbar-item">
        <NavLink 
          to="/" 
          style={{ textDecoration: "none" }} 
          exact 
          activeClassName="active-class"
        >
          Home
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink
          to="/login"
          style={{ textDecoration: "none" }}
          exact
          activeClassName="active-class"
        >
          login
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink
          to="/register"
          style={{ textDecoration: "none" }}
          exact
          activeClassName="active-class"
        >
          register
        </NavLink>
      </div>
    </section>
  );
};

export default Navbar;
