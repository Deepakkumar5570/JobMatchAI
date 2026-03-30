function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">JobMatchAI</h1>
          <p className="text-slate-500 text-sm mt-1">
            Resume Feedback, ATS Scoring & LLM Career Insights
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
            Backend Connected
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            Frontend Ready
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;