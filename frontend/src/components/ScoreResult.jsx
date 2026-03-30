function ScoreResult({ result }) {
  if (!result) return null;

  const {
    predicted_role,
    ats_score,
    semantic_score,
    fit_score,
    role_alignment,
    project_relevance,
    matched_skills = [],
    missing_skills = [],
    rejection_reasons = [],
  } = result;

  const MetricCard = ({ title, value, color }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className={`text-3xl font-extrabold mt-2 ${color}`}>{value}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-700">Scoring Result</h2>
        <p className="text-slate-500 mt-1">
          Here’s how your resume matches the target job.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
        <p className="text-sm text-emerald-700 font-medium">Predicted Role</p>
        <h3 className="text-3xl font-extrabold text-emerald-900 mt-2">
          {predicted_role || "N/A"}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard title="ATS Score" value={ats_score ?? "N/A"} color="text-emerald-600" />
        <MetricCard title="Semantic Score" value={semantic_score ?? "N/A"} color="text-indigo-600" />
        <MetricCard title="Fit Score" value={fit_score ?? "N/A"} color="text-blue-600" />
        <MetricCard title="Role Alignment" value={role_alignment ?? "N/A"} color="text-violet-600" />
        <MetricCard title="Project Relevance" value={project_relevance ?? "N/A"} color="text-orange-600" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Matched Skills</h3>
        <div className="flex flex-wrap gap-2">
          {matched_skills.length ? (
            matched_skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500">No matched skills found.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Missing Skills</h3>
        <div className="flex flex-wrap gap-2">
          {missing_skills.length ? (
            missing_skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500">No critical missing skills.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Rejection Reasons</h3>
        {rejection_reasons.length ? (
          <ul className="list-disc ml-6 text-slate-700 space-y-1">
            {rejection_reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No major rejection reasons detected.</p>
        )}
      </div>
    </div>
  );
}

export default ScoreResult;