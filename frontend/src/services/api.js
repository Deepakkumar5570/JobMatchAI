import axios from "axios";

// 👉 backend URL (NO trailing slash)
const API = axios.create({
  baseURL: "https://jobmatchai-backend-438s.onrender.com",
});

// -------------------
// Upload Resume
// -------------------
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// -------------------
// Score Match
// -------------------
export const runScoreMatch = async (payload) => {
  const res = await API.post("/scoring/match", payload);
  return res.data;
};

// -------------------
// LLM Analysis
// -------------------
export const runLLMAnalysis = async (payload) => {
  const res = await API.post("/llm/analyze", payload);
  return res.data;
};

// -------------------
// Health Check
// -------------------
export const checkHealth = async () => {
  const res = await API.get("/health");
  return res.data;
};

export default API;
