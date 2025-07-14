import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionTrend,
  fetchTopTransactions,
  fetchCategoryExpense,
  fetchCategoryIncome,
  fetchMostUsedCategory,
  fetchSavingsRate,
} from "../../../redux/Thunks/analysis.thunks.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TrendChart from "./TransactionTrendChart.jsx";
import TopTransactions from "./TopTransactions.jsx";
import CategoryChart from "./CategoryChart.jsx";

const AnalysisDashboard = () => {
  const dispatch = useDispatch();

  const analysis = useSelector((state) => state.analysis || {});
  const {
    transactionTrend = [],
    topTransactions = [],
    categoryExpense = {},
    categoryIncome = {},
    mostUsedCategory = "",
    savingsRate = 0,
    loading,
    error,
  } = analysis;

  const [fromDate, setFromDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    const datePayload = {
      fromDate: fromDate.toISOString().split("T")[0],
      toDate: toDate.toISOString().split("T")[0],
    };

    dispatch(fetchTransactionTrend(datePayload));
    dispatch(fetchTopTransactions(datePayload));
    dispatch(fetchCategoryExpense(datePayload));
    dispatch(fetchCategoryIncome(datePayload));
    dispatch(fetchMostUsedCategory());
    dispatch(fetchSavingsRate());
  }, [fromDate, toDate, dispatch]);

  const handleDownload = () => {
    const from = fromDate.toISOString().split("T")[0];
    const to = toDate.toISOString().split("T")[0];
    window.open(`/api/report/download?fromDate=${from}&toDate=${to}`, "_blank");
  };

  const filteredTrend = transactionTrend.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= fromDate && itemDate <= toDate;
  });

  const income = filteredTrend
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.total, 0);

  const expense = filteredTrend
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.total, 0);

  const balance = income - expense;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">From:</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            selectsStart
            startDate={fromDate}
            endDate={toDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">To:</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            selectsEnd
            startDate={fromDate}
            endDate={toDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          onClick={handleDownload}
        >
          Download Report
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Income</h2>
          <p className="text-xl font-bold text-green-600">₹{income}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Expense</h2>
          <p className="text-xl font-bold text-red-600">₹{expense}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Balance</h2>
          <p className="text-xl font-bold">₹{balance}</p>
        </div>
      </div>

      <TrendChart trendData={filteredTrend} />
      <TopTransactions fromDate={fromDate} toDate={toDate} trendData={filteredTrend} />
      <CategoryChart
        title="Expense by Category"
        categoryMap={categoryExpense}
        color="red"
      />
      <CategoryChart
        title="Income by Category"
        categoryMap={categoryIncome}
        color="green"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-1">Most Used Category</h3>
          <p className="text-lg">{mostUsedCategory || "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-1">Savings Rate</h3>
          <p className="text-lg">{savingsRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
