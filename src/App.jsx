
// // App.jsx
// import React from "react";
// import { HashRouter as Router } from "react-router-dom";
// import AllRoutes from "./Routes"; // This will contain your routes
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <AllRoutes />
//     </Router>
//   );
// }

// export default App;


import React, { useEffect } from "react";
import { HashRouter as Router, useNavigate } from "react-router-dom";
import AllRoutes from "./Routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AutoRedirect />
      <Navbar />
      <AllRoutes />
    </Router>
  );
}

function AutoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const isExtension = window.location.pathname.includes("extension.html");

    if (isExtension) {
      navigate("/extension");
    }
  }, [navigate]);

  return null;
}

export default App;
