  // src/App.js
  import React, { useState } from "react";
  import { checkUrlSafety } from "./api/phishingApi";
  import { motion } from "framer-motion";
  import "./App.css";

  function App() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setResult(null);
      setLoading(true);

      try {
        const response = await checkUrlSafety(url);
        setResult(response.prediction);  // <-- changed this
        } catch (err) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
      
    };

    return (
      <div className="App">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🛡️ Phishing Website Detector
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check"}
          </button>
        </motion.form>

        {error && <p className="error">{error}</p>}

        {!loading && result && (
        <motion.div
          className={`result-card ${result === "Legitimate" ? "safe" : "phishing"}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>{result}</h2>
        </motion.div>
      )}


        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>⚡ Powered by AI | Developed with ❤️</p>
        </motion.footer>
      </div>
    );
  }

  export default App;
