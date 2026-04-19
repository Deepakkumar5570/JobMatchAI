import React from "react";

const ResumeUpload = ({
  selectedFile,
  setSelectedFile,
  handleUpload,
  uploading,
}) => {
  return (
    <div className="card">
      <h3>Upload Resume</h3>

      <p className="subtext">
        Upload your resume PDF and we’ll extract the text for scoring and LLM analysis.
      </p>

      <div className="upload-row">
        <label className="custom-file-upload">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          Choose File
        </label>

        <span className="file-name">
          {selectedFile ? selectedFile.name : "No file selected"}
        </span>

        <button
          className="primary-btn"
          onClick={handleUpload}
          disabled={uploading || !selectedFile} // ✅ FIX
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;