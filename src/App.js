import React, { useState } from "react";
import { checkUrlSafety } from "./api/phishingApi";
import { motion } from "framer-motion";

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
      setResult(response.prediction);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: "Poppins, sans-serif",
      background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    app: {
      textAlign: "center",
      width: "100%",
      maxWidth: "500px",
    },
    form: {
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
    },
    input: {
      padding: "0.7rem",
      width: "100%",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      maxWidth: "400px",
    },
    button: {
      padding: "0.7rem 1.5rem",
      borderRadius: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
      width: "fit-content",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    resultCard: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "20px",
      fontSize: "1.5rem",
      width: "100%",
      maxWidth: "400px",
      margin: "20px auto",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s",
    },
    safe: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    phishing: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    error: {
      color: "red",
      marginTop: "1rem",
    },
    footer: {
      marginTop: "3rem",
      fontSize: "0.9rem",
      color: "#666",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.app}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🛡️ Phishing Website Detector
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          style={styles.form}
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
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Checking..." : "Check"}
          </button>
        </motion.form>

        {error && <p style={styles.error}>{error}</p>}

        {!loading && result && (
          <motion.div
            style={{
              ...styles.resultCard,
              ...(result === "Legitimate" ? styles.safe : styles.phishing),
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h2>{result}</h2>
          </motion.div>
        )}

        <motion.footer
          style={styles.footer}
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
