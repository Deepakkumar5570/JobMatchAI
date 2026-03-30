import { useState } from "react";
import Navbar from "./components/Navbar";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ScoreResult from "./components/ScoreResult";
import LLMAnalysis from "./components/LLMAnalysis";
import API from "./services/api";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [projectText, setProjectText] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [llmAnalysis, setLlmAnalysis] = useState(null);
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingLLM, setLoadingLLM] = useState(false);

  const handleScoreMatch = async () => {
    console.log("Before Score Match:", { resumeText, jdText, projectText });

    if (!resumeText.trim() || !jdText.trim()) {
      return alert("Resume text and JD text required");
    }

    try {
      setLoadingScore(true);

      const payload = {
        resume_text: resumeText,
        jd_text: jdText,
        project_text: projectText || "",
      };

      console.log("SCORE PAYLOAD:", payload);

      const res = await API.post("/scoring/match", payload);

      console.log("Scoring Result:", res.data);
      setScoreResult(res.data);
    } catch (error) {
      console.error("Scoring Error:", error.response?.data || error.message);
      alert("Scoring failed");
    } finally {
      setLoadingScore(false);
    }
  };

  const handleLLMAnalyze = async () => {
    console.log("Before LLM Analyze:", { resumeText, jdText, projectText });

    if (!resumeText.trim() || !jdText.trim()) {
      return alert("Resume text and JD text required");
    }

    try {
      setLoadingLLM(true);

      const payload = {
        resume_text: resumeText,
        jd_text: jdText,
        project_text: projectText || "",
      };

      console.log("LLM PAYLOAD:", payload);

      const res = await API.post("/llm/analyze", payload);

      console.log("LLM Result:", res.data);
      setLlmAnalysis(res.data);
    } catch (error) {
      console.error("LLM Error:", error.response?.data || error.message);
      alert("LLM analysis failed");
    } finally {
      setLoadingLLM(false);
    }
  };

  console.log("resumeText:", resumeText);
  console.log("jdText:", jdText);
  console.log("projectText:", projectText);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUpload setResumeText={setResumeText} />

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-4">Job Inputs</h2>

            <JobDescriptionInput jdText={jdText} setJdText={setJdText} />

            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">
                Project Text (Optional)
              </label>
              <textarea
                rows="8"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
                placeholder="Paste project descriptions here..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={handleScoreMatch}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl shadow transition"
              >
                {loadingScore ? "Matching..." : "Run Score Match"}
              </button>

              <button
                onClick={handleLLMAnalyze}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow transition"
              >
                {loadingLLM ? "Analyzing..." : "Run LLM Analysis"}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <ScoreResult result={scoreResult} />
        <LLMAnalysis analysis={llmAnalysis} />
      </div>
    </div>
  );
}

export default App;