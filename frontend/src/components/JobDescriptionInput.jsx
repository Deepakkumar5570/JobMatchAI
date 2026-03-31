import React from "react";

const JobDescriptionInput = ({
  jobDescription,
  setJobDescription,
  projectText,
  setProjectText,
  handleScoreMatch,
  handleLLMAnalysis,
  loadingScore,
  loadingLLM,
}) => {
  return (
    <div className="card">
      <h3>Job Inputs</h3>

      <div className="input-group">
        <label>Paste Job Description</label>
        <textarea
          rows="10"
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Project Text (Optional)</label>
        <textarea
          rows="7"
          placeholder="Paste project descriptions here..."
          value={projectText}
          onChange={(e) => setProjectText(e.target.value)}
        />
      </div>

      <div className="btn-row">
        <button className="primary-btn" onClick={handleScoreMatch} disabled={loadingScore}>
          {loadingScore ? "Running..." : "Run Score Match"}
        </button>

        <button className="secondary-btn" onClick={handleLLMAnalysis} disabled={loadingLLM}>
          {loadingLLM ? "Analyzing..." : "Run LLM Analysis"}
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionInput;