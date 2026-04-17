import React from "react";
import useTheme from "../hooks/useTheme";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

        {/* 🌙 THEME BUTTON */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;