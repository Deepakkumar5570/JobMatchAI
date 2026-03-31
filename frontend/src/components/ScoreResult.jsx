import React from "react";

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

  return (
    <div className="card">
      <h3>Scoring Result</h3>
      <p className="subtext">Here’s how your resume matches the target job.</p>

      <div className="score-grid">
        <div className="score-box wide">
          <span>Predicted Role</span>
          <h2>{predicted_role || "N/A"}</h2>
        </div>

        <div className="score-box">
          <span>ATS Score</span>
          <h2>{ats_score ?? "N/A"}</h2>
        </div>

        <div className="score-box">
          <span>Semantic Score</span>
          <h2>{semantic_score ?? "N/A"}</h2>
        </div>

        <div className="score-box">
          <span>Fit Score</span>
          <h2>{fit_score ?? "N/A"}</h2>
        </div>

        <div className="score-box">
          <span>Role Alignment</span>
          <h2>{role_alignment_score ?? "N/A"}</h2>
        </div>

        <div className="score-box">
          <span>Project Relevance</span>
          <h2>{project_relevance_score ?? "N/A"}</h2>
        </div>
      </div>

      <div className="result-section">
        <h4>Matched Skills</h4>
        <div className="tags-wrap">
          {matched_skills?.map((skill, idx) => (
            <span key={idx} className="tag green-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h4>Missing Skills</h4>
        <div className="tags-wrap">
          {missing_skills?.map((skill, idx) => (
            <span key={idx} className="tag red-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h4>Rejection Reasons</h4>
        <ul>
          {rejection_reasons?.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScoreResult;