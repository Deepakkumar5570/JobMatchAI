import React from "react";

const renderList = (title, items) => (
  <div className="analysis-block">
    <h4>{title}</h4>
    {Array.isArray(items) && items.length > 0 ? (
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>No items available.</p>
    )}
  </div>
);

const renderApplicationMessage = (title, text) => (
  <div className="analysis-block">
    <h4>{title}</h4>
    <div className="message-box">
      {text ? <p>{text}</p> : <p>N/A</p>}
    </div>
  </div>
);

const LLMAnalysis = ({ llmResult }) => {
  if (!llmResult) return null;

  const review = llmResult.review || {};
  const interview = llmResult.interview_questions || {};
  const career = llmResult.career_advice || {};
  const application = llmResult.application_message || {};

  return (
    <div className="card">
      <h3>LLM Analysis</h3>
      <p className="subtext">
        AI-generated resume feedback, project rewrites, interview prep and application messages.
      </p>

      <div className="analysis-section">
        <h3>Review</h3>
        <div className="analysis-block">
          <h4>Overall Evaluation</h4>
          <p>{review.overall_evaluation || "N/A"}</p>
        </div>

        {renderList("Rejection Reasons", review.rejection_reasons)}
        {renderList("Missing Skills", review.missing_skills)}
        {renderList("Weak Areas", review.weak_areas)}
      </div>

      <div className="analysis-section">
        <h3>Rewritten Projects</h3>
        {renderList("Projects", llmResult.rewritten_projects)}
      </div>

      <div className="analysis-section">
        <h3>Interview Questions</h3>
        {renderList("Technical", interview.technical)}
        {renderList("Project Based", interview.project_based)}
        {renderList("HR", interview.hr)}
      </div>

      <div className="analysis-section">
        <h3>Career Advice</h3>
        {renderList("Skills to Learn", career.skills_to_learn)}
        {renderList("Projects to Build", career.projects_to_build)}
        {renderList("Resume Improvements", career.resume_improvements)}
        {renderList("2-Month Roadmap", career.roadmap_2_months)}
      </div>

      <div className="analysis-section">
        <h3>Application Message</h3>
        {renderApplicationMessage("Cold Email", application.cold_email)}
        {renderApplicationMessage("Referral Message", application.referral_message)}
        {renderApplicationMessage("LinkedIn DM", application.linkedin_dm)}
      </div>
    </div>
  );
};

export default LLMAnalysis;