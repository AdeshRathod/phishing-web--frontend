import React, { useState } from "react";
import { checkUrlSafety } from "./api/phishingApi";
import { motion } from "framer-motion";
import ResultCard from "./components/ResultCard";

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
      setResult(response);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: 0,
      fontFamily: "Poppins, sans-serif",
      background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "700px" }}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🛡️ Phishing Website Detector
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            width: "100%",
          }}
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
            style={{
              padding: "0.8rem",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.8rem 2rem",
              borderRadius: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
              width: "100%",
              maxWidth: "250px",
            }}
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </motion.form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && result && <ResultCard result={result} />}

        <motion.footer
          style={{
            marginTop: "3rem",
            fontSize: "0.9rem",
            color: "#666",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>⚡ Powered by AI | Developed with ❤️</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
