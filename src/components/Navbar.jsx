// Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const location = useLocation();

  const navStyle = {
    padding: "1rem 2rem",
    background: "linear-gradient(135deg, #007bff, #00d4ff)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };


  const tabsContainerStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const tabStyle = (path) => ({
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    backgroundColor: location.pathname === path ? "#ffd700" : "transparent",
    color: location.pathname === path ? "#333" : "white",
    border: "2px solid white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  });

  return (
    <motion.nav
      style={navStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div style={tabsContainerStyle}>
        <Link to="/" style={tabStyle("/" )}>
          Detect Webpage
        </Link>
        <Link to="/image-scan" style={tabStyle("/image-scan") }>
          Detect Image
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;
