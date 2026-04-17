import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const ScoreChart = ({ data }) => {

  const chartData = [
    { subject: "ATS", score: data?.ats_score || 0 },
    { subject: "Semantic", score: data?.semantic_score || 0 },
    { subject: "Project", score: data?.project_relevance_score || 0 },
    { subject: "Role Fit", score: data?.role_alignment_score || 0 },
    { subject: "Overall", score: data?.fit_score || 0 },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;