import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("http://127.0.0.1:8000/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const runScoreMatch = async (payload) => {
  const res = await API.post("/scoring/match", payload);
  return res.data;
};

export const runLLMAnalysis = async (payload) => {
  const res = await API.post("/llm/analyze", payload);
  return res.data;
};

export const checkHealth = async () => {
  const res = await API.get("/health");
  return res.data;
};

export default API;