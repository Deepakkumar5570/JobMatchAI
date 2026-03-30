function JobDescriptionInput({ jdText, setJdText }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        Paste Job Description
      </label>
      <textarea
        rows="10"
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

export default JobDescriptionInput;