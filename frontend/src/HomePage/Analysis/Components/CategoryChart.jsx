import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#d0ed57", "#a4de6c"];

const formatData = (dataObj) => {
  console.log("formatData input:", dataObj);
  const formatted = Object.entries(dataObj || {}).map(([name, value]) => ({
    name,
    value: Number(value) || 0, // Ensure value is a number
  }));
  console.log("formatData output:", formatted);
  return formatted;
};

const CategoryChart = ({ title, categoryMap, color }) => {
  const data = formatData(categoryMap);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className={`font-bold mb-2 text-${color}-600`}>{title}</h4>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available for this period</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={color}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;