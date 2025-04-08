// ImageScanner.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { scanImageFile } from "../api/imageScanApi";

function ImageScanner() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload an image file.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await scanImageFile(file);
      setResult(response);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #eef2f7, #ffffff)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          🖼️ Image Malware Scanner
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "12px",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#6c757d" : "#007bff",
              color: "white",
              padding: "1rem",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {loading ? "🔎 Scanning..." : "🚀 Scan Image"}
          </button>
        </motion.form>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        {!loading && result && <ResultCard result={result} />}

        <motion.footer
          style={{ marginTop: "2rem", fontSize: "0.85rem", color: "#888" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>✨ Powered by AI | Developed with ❤️</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default ImageScanner;

function formatKey(key) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value) {
  if (typeof value === "boolean") {
    return value ? "✅ Safe" : "❌ Unsafe";
  }
  if (typeof value === "string" && value.trim() === "") {
    return "Not available";
  }
  if (value === null || value === undefined) {
    return "Not available";
  }
  return value.toString();
}

function ResultCard({ result }) {
  if (!result) return null;

  const fields = Object.entries(result);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      style={{
        marginTop: "2rem",
        backgroundColor: "#f9f9f9",
        padding: "1.5rem",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "left",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🔍 Detailed Scan Report</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {fields.map(([key, value]) => (
          <li
            key={key}
            style={{
              marginBottom: "0.7rem",
              fontSize: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>{formatKey(key)}</span>
            <span
              style={{
                color:
                  typeof value === "boolean"
                    ? value
                      ? "green"
                      : "red"
                    : "#333",
                fontWeight: 500,
              }}
            >
              {formatValue(value)}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
