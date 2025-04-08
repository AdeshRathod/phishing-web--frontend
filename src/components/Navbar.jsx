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
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = (path) => ({
    margin: "0 1rem",
    color: location.pathname === path ? "#ffd700" : "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    transition: "color 0.3s ease",
  });

  return (
    <motion.nav
      style={navStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
        🛡️ MalScan
      </div>

      <div>
        <Link to="/" style={linkStyle("/")}>
          Detect Webpage
        </Link>
        <Link to="/image-scan" style={linkStyle("/image-scan")}>
          Detect Image
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;
