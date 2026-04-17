import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>JobMatchAI</h3>
          <p>AI-powered Resume Analysis & Job Matching Platform</p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <h4>Contact</h4>
          <p>Email: deepak0778671@gmail.com</p>
          <p>Phone: +91-8941955754</p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <h4>Links</h4>
          <a href="https://github.com/Deepakkumar5570" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/deepak-kumar-029781263/" target="_blank">LinkedIn</a>
          <a href="https://deepak47.netlify.app/">Portfolio</a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Deepak Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;