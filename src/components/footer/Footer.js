import React from "react";
import "./Footer.css";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer_title">codeNgeek</p>

      <div className="social_icons">
        <a href="https://github.com/karan320" rel="noreferrer" target="_blank">
          <AiOutlineGithub className="icon" />
        </a>
        <a href="https://www.instagram.com/karan.siddhu/" rel="noreferrer" target="_blank">
          <AiOutlineInstagram className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/karan-siddhu-040014194/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin className="icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
