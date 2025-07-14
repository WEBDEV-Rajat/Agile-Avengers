import React from "react";
import { useSelector } from "react-redux";

const SavingsRateCard = () => {
const analysis = useSelector((state) => state.analysis);
const { savingsRate = 0, mostUsedCategory = "N/A" } = analysis || {};

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-purple-100 p-4 rounded shadow text-center">
        <h4 className="text-lg font-bold text-purple-700">Savings Rate</h4>
        <p className="text-xl font-semibold">{savingsRate}%</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow text-center">
        <h4 className="text-lg font-bold text-yellow-700">Most Used Category</h4>
        <p className="text-xl font-semibold">{mostUsedCategory}</p>
      </div>
    </div>
  );
};

export default SavingsRateCard;
