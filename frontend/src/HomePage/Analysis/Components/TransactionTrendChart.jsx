import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TrendChart = ({ trendData }) => {
  // Transform data: group by date, split income/expense
  const groupedData = trendData.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.date);
    if (existing) {
      existing[item.type] = item.total;
    } else {
      acc.push({
        date: item.date,
        [item.type]: item.total,
      });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold text-lg mb-4">Transaction Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4CAF50" name="Income" />
          <Bar dataKey="expense" fill="#F44336" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
