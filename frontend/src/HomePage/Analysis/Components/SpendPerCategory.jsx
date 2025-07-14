import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { exportToCSV, exportToPDF } from '../Utils/exportUtils';

const SpendPerCategory = ({ data, loading, error }) => {
  if (loading) return <p className="text-blue-600 text-center">Loading spend data...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const hasData = Object.keys(data || {}).length > 0;

  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    category: key,
    amount: value,
  }));

  return (
    <div className="max-h-[400px] overflow-y-auto pr-1">
      {hasData ? (
        <>
        
          <div className="flex gap-3 mb-6 justify-end">
            <button
              onClick={() => exportToCSV(data, "spend_per_category.csv")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF(data, "Spend Per Category", "spend_per_category.pdf")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Export PDF
            </button>
          </div>

       
          <div className="w-full h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-30} textAnchor="end" interval={0} height={60} />
                <YAxis />
                <Tooltip formatter={(val) => `₹${val.toFixed(2)}`} />
                <Bar dataKey="amount" fill="#EF4444" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <ul className="space-y-2">
            {chartData.map(({ category, amount }) => (
              <li
                key={category}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
              >
                <span className="font-medium text-gray-700 capitalize">{category}</span>
                <span className="font-bold text-red-600">₹{amount?.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-600 text-center py-4">No spend data available for the selected period.</p>
      )}
    </div>
  );
};

export default SpendPerCategory;
