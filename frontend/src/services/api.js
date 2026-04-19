// import axios from "axios";

// // ✅ PRODUCTION BACKEND
// const API = axios.create({
//   baseURL: "https://jobmatchai-backend-438s.onrender.com",
// });

// // =========================
// // ✅ Upload Resume
// // =========================
// export const uploadResume = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await API.post("/resume/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     throw error;
//   }
// };

// // =========================
// // ✅ Job Parse (FIXED)
// // =========================
// export const parseJob = async (jdText) => {
//   try {
//     const res = await API.post("/jobs/parse", {
//       jd_text: jdText, // ✅ IMPORTANT FIX
//     });

//     return res.data;
//   } catch (error) {
//     console.error("JOB PARSE ERROR:", error);
//     throw error;
//   }
// };

// // =========================
// // ✅ Score Match (FIXED)
// // =========================
// export const runScoreMatch = async ({ resumeText, jdText }) => {
//   try {
//     const res = await API.post("/scoring/match", {
//       resume_text: resumeText,
//       jd_text: jdText, // ✅ IMPORTANT FIX
//     });

//     return res.data;
//   } catch (error) {
//     console.error("SCORING ERROR:", error);
//     throw error;
//   }
// };

// // =========================
// // ✅ LLM Analysis
// // =========================
// export const runLLMAnalysis = async (resumeText) => {
//   try {
//     const res = await API.post("/llm/analyze", {
//       text: resumeText,
//     });

//     return res.data;
//   } catch (error) {
//     console.error("LLM ERROR:", error);
//     throw error;
//   }
// };

// // =========================
// // ✅ Health Check
// // =========================
// export const checkHealth = async () => {
//   try {
//     const res = await API.get("/health");
//     return res.data;
//   } catch (error) {
//     console.error("HEALTH ERROR:", error);
//     throw error;
//   }
// };





import axios from "axios";

// ✅ USE LOCAL BACKEND (FAST)
const API = axios.create({
  baseURL: "https://jobmatchai-backend-438s.onrender.com/",
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
