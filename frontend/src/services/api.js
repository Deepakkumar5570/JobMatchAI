import axios from "axios";

// ✅ USE LOCAL BACKEND (FAST)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ✅ Upload Resume
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    throw error;
  }
};

// ✅ Score Match
export const runScoreMatch = async (payload) => {
  const res = await API.post("/scoring/match", payload);
  return res.data;
};

// ✅ LLM Analysis
export const runLLMAnalysis = async (payload) => {
  const res = await API.post("/llm/analyze", payload);
  return res.data;
};

// ✅ Health
export const checkHealth = async () => {
  const res = await API.get("/health");
  return res.data;
};