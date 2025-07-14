import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { exportToCSV, exportToPDF } from '../Utils/exportUtils';

const IncomePerCategory = ({ data, loading, error }) => {
  if (loading) return <p className="text-blue-600 text-center">Loading income data...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    category: key,
    amount: value,
  }));

  const hasData = chartData.length > 0;

  return (
    <div className="max-h-[400px] overflow-y-auto pr-1">
      {hasData ? (
        <>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => exportToCSV(data, "income_per_category.csv")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF(data, "Income Per Category", "income_per_category.pdf")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Export PDF
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Income per Category (Bar Chart)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="amount" fill="#16a34a" name="Income" />
              </BarChart>
            </ResponsiveContainer>
          </div>

         
          <div className="max-h-[350px] overflow-y-auto pr-1">
            <ul className="space-y-2">
              {chartData.map(({ category, amount }) => (
                <li
                  key={category}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
                >
                  <span className="font-medium text-gray-700 capitalize">{category}</span>
                  <span className="font-bold text-green-600">₹{amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center py-4">No income data available for the selected period.</p>
      )}
    </div>
  );
};

export default IncomePerCategory;
