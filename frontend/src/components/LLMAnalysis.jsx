function LLMAnalysis({ analysis }) {
  if (!analysis) return null;

  const review = analysis.review || {};
  const rewrittenProjects = analysis.rewritten_projects || [];
  const interviewQuestions = analysis.interview_questions || {};
  const careerAdvice = analysis.career_advice || {};
  const applicationMessage = analysis.application_message || {};

  const SectionCard = ({ title, children }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );

  const ListBlock = ({ items, empty = "No items available." }) => (
    items && items.length ? (
      <ul className="list-disc ml-6 space-y-1 text-slate-700">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-slate-500">{empty}</p>
    )
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-indigo-700">LLM Analysis</h2>
        <p className="text-slate-500 mt-1">
          AI-generated resume feedback, project rewrites, interview prep and application messages.
        </p>
      </div>

      <SectionCard title="Review">
        <p className="text-slate-700">
          <span className="font-semibold">Overall Evaluation:</span>{" "}
          {review.overall_evaluation || "N/A"}
        </p>

        <div className="mt-4">
          <p className="font-semibold mb-2">Rejection Reasons</p>
          <ListBlock items={review.rejection_reasons || []} />
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-2">Missing Skills</p>
          <ListBlock items={review.missing_skills || []} />
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-2">Weak Areas</p>
          <ListBlock items={review.weak_areas || []} />
        </div>
      </SectionCard>

      <SectionCard title="Rewritten Projects">
        <ListBlock items={rewrittenProjects} />
      </SectionCard>

      <SectionCard title="Interview Questions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold mb-2">Technical</p>
            <ListBlock items={interviewQuestions.technical || []} />
          </div>
          <div>
            <p className="font-semibold mb-2">Project Based</p>
            <ListBlock items={interviewQuestions.project_based || []} />
          </div>
          <div>
            <p className="font-semibold mb-2">HR</p>
            <ListBlock items={interviewQuestions.hr || []} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Career Advice">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2">Skills to Learn</p>
            <ListBlock items={careerAdvice.skills_to_learn || []} />
          </div>
          <div>
            <p className="font-semibold mb-2">Projects to Build</p>
            <ListBlock items={careerAdvice.projects_to_build || []} />
          </div>
          <div>
            <p className="font-semibold mb-2">Resume Improvements</p>
            <ListBlock items={careerAdvice.resume_improvements || []} />
          </div>
          <div>
            <p className="font-semibold mb-2">2-Month Roadmap</p>
            <ListBlock items={careerAdvice.roadmap_2_months || []} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Application Message">
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Cold Email</p>
            <div className="bg-white border border-slate-200 rounded-xl p-4 whitespace-pre-wrap text-slate-700">
              {applicationMessage.cold_email || "N/A"}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Referral Message</p>
            <div className="bg-white border border-slate-200 rounded-xl p-4 whitespace-pre-wrap text-slate-700">
              {applicationMessage.referral_message || "N/A"}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">LinkedIn DM</p>
            <div className="bg-white border border-slate-200 rounded-xl p-4 whitespace-pre-wrap text-slate-700">
              {applicationMessage.linkedin_dm || "N/A"}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default LLMAnalysis;