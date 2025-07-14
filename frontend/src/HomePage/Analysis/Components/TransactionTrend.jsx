import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TransactionTrend = ({ data = [], loading, error }) => {
  if (loading) return <p className="text-blue-600 text-center">Loading trend data...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!data.length) return <p className="text-gray-600 text-center py-4">No transaction trend data available.</p>;

  const groupedData = data.reduce((acc, item) => {
    const existing = acc[item.date] || { date: item.date };
    existing[item.type] = item.total;
    acc[item.date] = existing;
    return acc;
  }, {});
  const chartData = Object.values(groupedData);

  const exportToCSV = () => {
    const csvHeader = ['Date', 'Income', 'Expense'];
    const csvRows = chartData.map(row => [
      row.date,
      row.income?.toFixed(2) || '',
      row.expense?.toFixed(2) || '',
    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_trend.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Trend Report', 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [['Date', 'Income', 'Expense']],
      body: chartData.map(row => [
        row.date,
        row.income?.toFixed(2) || '',
        row.expense?.toFixed(2) || '',
      ]),
    });
    doc.save('transaction_trend.pdf');
  };

  return (
    <div className="w-full">
    
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={exportToCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Export CSV
        </button>
        <button
          onClick={exportToPDF}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Export PDF
        </button>
      </div>

   
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#16a34a" name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#dc2626" name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionTrend;
