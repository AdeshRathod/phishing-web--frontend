import React from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ResultCard = ({ result }) => {

  const navigate = useNavigate();

  const phishingChance = result.model_probability_phishing * 100;
  const isHighRisk = phishingChance >= 50;

  const importantFeatures = [
    { label: "Uses HTTPS", value: result.extracted_features.uses_https },
    { label: "Short URL", value: result.extracted_features.short_url },
    { label: "Has IP Address", value: result.extracted_features.has_ip },
    { label: "Has Suspicious Words", value: result.extracted_features.has_suspicious_words },
  ];

  return (
    <motion.div
      style={{
        marginTop: "20px",
        padding: "30px",
        borderRadius: "20px",
        backgroundColor: isHighRisk ? "#f8d7da" : "#d4edda",
        color: isHighRisk ? "#721c24" : "#155724",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h2 style={{ textAlign: "center" }}>
        {isHighRisk ? "⚠️ Potential Phishing Detected" : "✅ Safe Website"}
      </h2>

      <div style={{ margin: "20px auto", width: "120px" }}>
        <CircularProgressbar
          value={phishingChance}
          text={`${phishingChance.toFixed(1)}%`}
          styles={buildStyles({
            pathColor: isHighRisk ? "#dc3545" : "#28a745",
            textColor: isHighRisk ? "#dc3545" : "#28a745",
          })}
        />
        <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
          Phishing Chance's
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>🛡️ External Checks</h3>
        <p>
          <strong>VirusTotal Scan:</strong>{" "}
          {result.external_checks.virustotal_detected ? "⚠️ Detected" : "✅ Not Detected"}
        </p>

        <h3>🔍 Key Features</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {importantFeatures.map((feature, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {feature.label}:{" "}
              {feature.value ? (
                <span style={{ color: "#28a745" }}>✅ Yes</span>
              ) : (
                <span style={{ color: "#dc3545" }}>❌ No</span>
              )}
            </li>
          ))}
        </ul>
        <h3>📊 URL Characteristics</h3>
        <div style={{ display: "flex", gap: "15px", marginTop: "10px", flexWrap: "wrap" }}>
          <div style={{ background: "#f0f0f0", padding: "10px 20px", borderRadius: "10px" }}>
            <strong>Domain Age:</strong><br /> {result.external_checks.domain_age_days} days
          </div>
          <div style={{ background: "#f0f0f0", padding: "10px 20px", borderRadius: "10px" }}>
            <strong>Domain Length:</strong><br /> {result.extracted_features.domain_length} characters
          </div>
          <div style={{ background: "#f0f0f0", padding: "10px 20px", borderRadius: "10px" }}>
            <strong>Path Length:</strong><br /> {result.extracted_features.path_length} characters
          </div>
        </div>


        <h3>🧠 AI Reasoning</h3>
        <ul style={{ listStyle: "disc inside", paddingLeft: "20px" }}>
          {result.reasoning.map((reason, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {reason}
            </li>
          ))}
        </ul>

      </div>

      <button
        onClick={() => navigate(`/website-details`, { state: { result } })}
        // onClick={() => navigate(`/website-details/${encodeURIComponent(result.url)}`, { state: { result } })}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        🔎 View More Details
      </button>

    </motion.div>
  );
};

export default ResultCard;
