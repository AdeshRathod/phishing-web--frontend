
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
      setResult(response);
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
      maxWidth: "600px",
    },
    form: {
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
    },
    input: {
      padding: "0.8rem",
      width: "100%",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      maxWidth: "450px",
    },
    button: {
      padding: "0.8rem 2rem",
      borderRadius: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    resultCard: {
      marginTop: "20px",
      padding: "30px",
      borderRadius: "20px",
      fontSize: "1rem",
      width: "100%",
      maxWidth: "500px",
      margin: "20px auto",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.3s",
      backgroundColor: "white",
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
    detailItem: {
      textAlign: "left",
      marginBottom: "10px",
    },
    badge: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "8px",
      fontSize: "0.8rem",
      marginLeft: "10px",
    },
    badgeTrue: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    badgeFalse: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
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
              ...(result.prediction === "Legitimate" ? styles.safe : styles.phishing),
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h2>🔎 Result: {result.prediction}</h2>

            <div style={{ marginTop: "20px", textAlign: "left" }}>
              <div style={styles.detailItem}>
                <strong>Domain Age:</strong> {result.external_checks.domain_age_days} days
              </div>

              <div style={styles.detailItem}>
                <strong>Safe Browsing:</strong>
                <span
                  style={{
                    ...styles.badge,
                    ...(result.external_checks.safe_browsing_detected
                      ? styles.badgeTrue
                      : styles.badgeFalse),
                  }}
                >
                  {result.external_checks.safe_browsing_detected ? "Detected" : "Not Detected"}
                </span>
              </div>

              <div style={styles.detailItem}>
                <strong>VirusTotal Scan:</strong>
                <span
                  style={{
                    ...styles.badge,
                    ...(result.external_checks.virustotal_detected
                      ? styles.badgeTrue
                      : styles.badgeFalse),
                  }}
                >
                  {result.external_checks.virustotal_detected ? "Detected" : "Not Detected"}
                </span>
              </div>
            </div>
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
