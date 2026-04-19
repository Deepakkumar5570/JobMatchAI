import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ScoreResult from "./components/ScoreResult";
import LLMAnalysis from "./components/LLMAnalysis";
import Footer from "./components/Footer";

import { uploadResume, runScoreMatch, runLLMAnalysis } from "./services/api";

function App() {
  const [view, setView] = useState("home");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [projectText, setProjectText] = useState("");

  const [scoringResult, setScoringResult] = useState(null);
  const [llmResult, setLlmResult] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingLLM, setLoadingLLM] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a resume file first.");
      return;
    }

    try {
      setUploading(true);
      const data = await uploadResume(selectedFile);

      const extractedText =
        data?.resume_text ||
        data?.text ||
        data?.raw_text ||
        data?.content ||
        "";

      if (!extractedText) {
        alert("Resume uploaded but no text was extracted.");
        console.log("Upload response:", data);
      }

      setResumeText(extractedText);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Resume upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleScoreMatch = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload resume and paste job description first.");
      return;
    }

    try {
      setLoadingScore(true);

      const payload = {
        resume_text: resumeText,
        jd_text: jobDescription,
        project_text: projectText,
      };

      console.log("Scoring payload:", payload);

      const data = await runScoreMatch(payload);
      console.log("Scoring response:", data);

      setScoringResult(data);
    } catch (error) {
      console.error("Score Match Error:", error);
      alert("Score matching failed.");
    } finally {
      setLoadingScore(false);
    }
  };

  const handleLLMAnalysis = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload resume and paste job description first.");
      return;
    }

    try {
      setLoadingLLM(true);

      const payload = {
        resume_text: resumeText,
        jd_text: jobDescription,
        project_text: projectText,
      };

      console.log("LLM payload:", payload);

      const data = await runLLMAnalysis(payload);
      console.log("LLM response:", data);

      setLlmResult(data);
    } catch (error) {
      console.error("LLM Analysis Error:", error);
      alert("LLM analysis failed.");
    } finally {
      setLoadingLLM(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="container">
        <div className="hero-card">
          <div className="hero-left">
            <span className="badge">AI Resume Analyzer</span>
            <h1>Resume Feedback, ATS Scoring & Career Copilot</h1>
            <p>
              Upload your resume, paste a job description, and get scoring, missing
              skills, interview prep, rewritten projects and AI-generated messages.
            </p>
          </div>
        </div>

        <div className="hero-section">
          <h1>🚀 AI Resume Analyzer & Career Copilot</h1>

          <p>
            Get ATS score, skill gaps, role fit, and AI-powered career insights
            tailored to your dream job.
          </p>


          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setView("upload")}
            >
              Try Now
            </button>

            <button
              className="secondary-btn"
              onClick={() => setView("features")}
            >
              View Features
            </button>
          </div>
        </div>

        {view === "features" && (
          <div id="features" className="features-section">

            <h2>✨ What You Get</h2>

            <div className="features-grid">
              <div className="feature-card">
                <h3>ATS Scoring</h3>
                <p>See how well your resume passes ATS filters.</p>
              </div>

              <div className="feature-card">
                <h3>AI Insights</h3>
                <p>Understand strengths, weaknesses, and improvements.</p>
              </div>

              <div className="feature-card">
                <h3>Skill Gap Analysis</h3>
                <p>Find missing skills based on job description.</p>
              </div>

              <div className="feature-card">
                <h3> Career Guidance</h3>
                <p>Get interview questions and job-ready suggestions.</p>
              </div>
            </div>

          </div>
        )}

        <div className="how-section">
          <h2>⚙️ How It Works</h2>

          <div className="steps">
            <div>1️⃣ Upload Resume</div>
            <div>2️⃣ Paste Job Description</div>
            <div>3️⃣ Get AI Analysis</div>
          </div>
        </div>

        {view === "upload" && (
          <div className="dashboard-grid">

            <div id="upload-section" className="left-panel">
              <ResumeUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                handleUpload={handleUpload}
                uploading={uploading}
              />

              <JobDescriptionInput
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                projectText={projectText}
                setProjectText={setProjectText}
                handleScoreMatch={handleScoreMatch}
                handleLLMAnalysis={handleLLMAnalysis}
                loadingScore={loadingScore}
                loadingLLM={loadingLLM}
              />
            </div>

            <div className="right-panel">
              <ScoreResult scoringResult={scoringResult} />
            </div>

          </div>
        )}

        <LLMAnalysis llmResult={llmResult} />
      </div>
      <Footer />
    </div>
  );
}


export default App;
