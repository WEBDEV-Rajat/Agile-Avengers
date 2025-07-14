import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FinancialOverview = ({ overview, loading, error }) => {
  if (loading) {
    return <p className="text-blue-600 text-center">Loading overview...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  const chartData = [
    {
      name: "Income",
      amount: overview?.income || 0,
    },
    {
      name: "Expense",
      amount: overview?.expense || 0,
    },
    {
      name: "Balance",
      amount: overview?.balance || 0,
    },
  ];

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <p className="text-blue-700 font-medium">Total Income</p>
          <p className="text-2xl font-bold">₹{overview?.income?.toFixed(2) || "0.00"}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
          <p className="text-red-700 font-medium">Total Expense</p>
          <p className="text-2xl font-bold">₹{overview?.expense?.toFixed(2) || "0.00"}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
          <p className="text-green-700 font-medium">Net Balance</p>
          <p className="text-2xl font-bold">₹{overview?.balance?.toFixed(2) || "0.00"}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Summary (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialOverview;
