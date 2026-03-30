import { useState } from "react";
import API from "../services/api";

function ResumeUpload({ setResumeText }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a resume PDF first");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPLOAD RESPONSE:", res.data);

      const extractedText = res.data.resume_text || "";

      console.log("Extracted Resume Text:", extractedText);

      if (!extractedText.trim()) {
        alert("Resume uploaded but no text extracted");
        return;
      }

      setResumeText(extractedText);
      alert("Resume uploaded and text extracted successfully!");
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      <p className="text-slate-500 mb-4">
        Upload your resume PDF and we’ll extract the text for scoring and LLM analysis.
      </p>

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-50"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow transition"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;