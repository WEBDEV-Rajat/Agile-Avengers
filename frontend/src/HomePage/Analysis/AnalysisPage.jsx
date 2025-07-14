import React from "react";
import AnalysisDashboard from "./Components/AnalysisDashboard.jsx";

const AnalysisPage = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Financial Analysis</h2>
      <AnalysisDashboard />
    </div>
  );
};

export default AnalysisPage;
