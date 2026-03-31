import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo-box">J</div>
        <div>
          <h2>JobMatchAI</h2>
          <p>Resume Feedback, ATS Scoring & LLM Career Insights</p>
        </div>
      </div>

      <div className="navbar-right">
        <span className="status-pill green">Backend Connected</span>
        <span className="status-pill blue">Frontend Ready</span>
      </div>
    </div>
  );
};

export default Navbar;