import React from "react";
import { useSelector } from "react-redux";

const FinancialOverview = () => {
  const analysis = useSelector((state) => state.analysis);
  const { topTransactions = {}, fromDate, toDate } = analysis || {};
  const transactions = topTransactions?.transactions || [];

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= new Date(fromDate) && txDate <= new Date(toDate);
  });

  const income = filteredTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = filteredTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-green-100 p-4 rounded shadow">
        <h4 className="text-lg font-bold text-green-700">Income</h4>
        <p className="text-xl font-semibold">₹{income}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h4 className="text-lg font-bold text-red-700">Expense</h4>
        <p className="text-xl font-semibold">₹{expense}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h4 className="text-lg font-bold text-blue-700">Balance</h4>
        <p className="text-xl font-semibold">₹{balance}</p>
      </div>
    </div>
  );
};

export default FinancialOverview;
