import React from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ResultCard = ({ result }) => {
  const isLegitimate = result.prediction.includes("Legitimate");

  const importantFeatures = [
    { label: "Uses HTTPS", value: result.extracted_features.uses_https },
    { label: "Short URL", value: result.extracted_features.short_url },
    { label: "Has IP Address", value: result.extracted_features.has_ip },
    { label: "Has Suspicious Words", value: result.extracted_features.has_suspicious_words },
  ];

  const chartData = {
    labels: ["Domain Age (days)", "Domain Length", "Path Length"],
    datasets: [
      {
        label: "Value",
        data: [
          result.external_checks.domain_age_days,
          result.extracted_features.domain_length,
          result.extracted_features.path_length,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  return (
    <motion.div
      style={{
        marginTop: "20px",
        padding: "30px",
        borderRadius: "20px",
        backgroundColor: isLegitimate ? "#d4edda" : "#f8d7da",
        color: isLegitimate ? "#155724" : "#721c24",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h2 style={{ textAlign: "center" }}>
        {isLegitimate ? "✅ Safe Website" : "⚠️ Potential Phishing Detected"}
      </h2>

      <div style={{ margin: "20px auto", width: "120px" }}>
        <CircularProgressbar
          value={result.model_probability_phishing * 100}
          text={`${(result.model_probability_phishing * 100).toFixed(1)}%`}
          styles={buildStyles({
            pathColor: isLegitimate ? "#28a745" : "#dc3545",
            textColor: isLegitimate ? "#28a745" : "#dc3545",
          })}
        />
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>🛡️ External Checks</h3>
        <p>
          <strong>Safe Browsing:</strong>{" "}
          {result.external_checks.safe_browsing_detected ? "⚠️ Detected" : "✅ Not Detected"}
        </p>
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
        <div style={{ marginTop: "10px" }}>
          <Bar data={chartData} options={{ plugins: { legend: { display: false } } }} />
        </div>

        <h3>🧠 AI Reasoning</h3>
        <p>{result.reasoning[0]}</p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
