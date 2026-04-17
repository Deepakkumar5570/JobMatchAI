import React from "react";
import ScoreChart from "./ScoreChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const ScoreResult = ({ scoringResult }) => {
  if (!scoringResult) return null;

  const {
    predicted_role,
    ats_score,
    semantic_score,
    fit_score,
    role_alignment_score,
    project_relevance_score,
    matched_skills,
    missing_skills,
    rejection_reasons,
  } = scoringResult;

  // ✅ PDF DOWNLOAD FUNCTION
  const downloadPDF = async () => {
    const input = document.getElementById("report-section");
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("JobMatch_Report.pdf");
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ DOWNLOAD BUTTON */}
      <motion.button
        className="download-btn"
        onClick={downloadPDF}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        📄 Download Report
      </motion.button>

      {/* ✅ REPORT WRAPPER */}
      <div id="report-section">
        <h3>Scoring Result</h3>
        <p className="subtext">
          Here’s how your resume matches the target job.
        </p>

        <p style={{ opacity: 0.7 }}>
          This chart shows how well your resume matches the job across key
          dimensions.
        </p>

        {/* ✅ CHART */}
        <motion.div
          className="chart-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>📊 Score Visualization</h3>
          <ScoreChart data={scoringResult} />
        </motion.div>

        {/* ✅ INSIGHTS */}
        <div className="insight-box">
          <h3>🧠 What This Means</h3>

          <ul>
            <li>
              <strong>ATS Score:</strong> {ats_score} →{" "}
              {ats_score > 80
                ? "Excellent keyword optimization ✅"
                : ats_score > 60
                  ? "Good but can improve ⚡"
                  : "Low — needs optimization ❌"}
            </li>

            <li>
              <strong>Semantic Score:</strong> {semantic_score} →{" "}
              {semantic_score > 70
                ? "Strong contextual match 🧠"
                : semantic_score > 50
                  ? "Moderate understanding"
                  : "Weak relevance ❌"}
            </li>

            <li>
              <strong>Project Relevance:</strong> {project_relevance_score} →{" "}
              {project_relevance_score > 70
                ? "Highly relevant 🚀"
                : project_relevance_score > 50
                  ? "Somewhat relevant"
                  : "Needs better projects ❌"}
            </li>

            <li>
              <strong>Role Alignment:</strong> {role_alignment_score} →{" "}
              {role_alignment_score > 70
                ? "Strong fit 💼"
                : role_alignment_score > 50
                  ? "Partial match"
                  : "Weak alignment ❌"}
            </li>

            <li>
              <strong>Overall Fit:</strong> {fit_score} →{" "}
              {fit_score > 75
                ? "Strong candidate 🔥"
                : fit_score > 60
                  ? "Decent fit"
                  : "Needs improvement ❌"}
            </li>
          </ul>
        </div>


        <motion.div
          className="ai-summary-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h3>🤖 AI Summary</h3>

          <p>
            {fit_score > 70
              ? "You are a strong candidate for this role. Your resume aligns well with job expectations, but a few improvements can further increase your chances."
              : "Your resume shows potential, but there are noticeable gaps in alignment, skills, and project strength that need improvement."}
          </p>

          <ul>
            <li>
              Improve <strong>missing skills</strong> mentioned below
            </li>
            <li>
              Add more <strong>impact-driven project descriptions</strong>
            </li>
            <li>
              Optimize resume for <strong>ATS keywords</strong>
            </li>
          </ul>
        </motion.div>




        <motion.div
          className="action-plan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>🎯 Action Plan</h3>

          <div className="action-grid">
            <div className="action-card">
              <h4>🚀 Quick Wins</h4>
              <ul>
                <li>Add missing keywords</li>
                <li>Improve formatting</li>
                <li>Rewrite weak bullet points</li>
              </ul>
            </div>

            <div className="action-card">
              <h4>📈 Medium Effort</h4>
              <ul>
                <li>Add 1–2 strong projects</li>
                <li>Quantify achievements</li>
                <li>Improve role alignment</li>
              </ul>
            </div>

            <div className="action-card">
              <h4>🏆 High Impact</h4>
              <ul>
                <li>Build domain-specific projects</li>
                <li>Optimize resume for target role</li>
                <li>Prepare for interviews</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ✅ SCORE GRID */}
        <div className="score-grid">
          <motion.div
            className="score-box wide"
            whileHover={{ scale: 1.05 }}
          >
            <span>Predicted Role</span>
            <h2>{predicted_role || "N/A"}</h2>
          </motion.div>

          {[
            { label: "ATS Score", value: ats_score },
            { label: "Semantic Score", value: semantic_score },
            { label: "Fit Score", value: fit_score },
            { label: "Role Alignment", value: role_alignment_score },
            { label: "Project Relevance", value: project_relevance_score },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="score-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span>{item.label}</span>
              <h2>{item.value ?? "N/A"}</h2>
            </motion.div>
          ))}
        </div>

        {/* ✅ MATCHED SKILLS */}
        <motion.div
          className="result-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4>Matched Skills</h4>
          <div className="tags-wrap">
            {matched_skills?.map((skill, idx) => (
              <motion.span
                key={idx}
                className="tag green-tag"
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ✅ MISSING SKILLS */}
        <motion.div
          className="result-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4>Missing Skills</h4>
          <div className="tags-wrap">
            {missing_skills?.map((skill, idx) => (
              <motion.span
                key={idx}
                className="tag red-tag"
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ✅ REJECTION REASONS */}
        <motion.div
          className="result-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h4>Rejection Reasons</h4>
          <ul>
            {rejection_reasons?.map((reason, idx) => (
              <motion.li key={idx} whileHover={{ x: 5 }}>
                {reason}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScoreResult;