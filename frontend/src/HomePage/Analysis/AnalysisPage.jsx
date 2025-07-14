
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAmountSpendPerCategory,
  fetchAmountIncomePerCategory,
  fetchFinancialOverview,
  fetchTransactionTrend,
  fetchTopTransactions,
  fetchMostUsedCategory,
  fetchSavingsRate,
  clearAnalysisErrors,
} from "../../redux/Slices/analysis.slices.js";

import FinancialOverview from "./Components/FinancialOverview.jsx";
import SpendPerCategory from "./Components/SpendPerCategory.jsx";
import IncomePerCategory from './Components/IncomePerCategory.jsx';
import TransactionTrend from './Components/TransactionTrend.jsx';
import TopTransactions from './Components/TopTransactions.jsx';
import MostUsedCategory from './Components/MostUsedCategory.jsx';
import SavingsRate from "./Components/SavingsRate.jsx";


const TABS = [
  { key: "overview", label: "Financial Overview", component: FinancialOverview },
  { key: "spend", label: "Spend per Category", component: SpendPerCategory },
  { key: "income", label: "Income per Category", component: IncomePerCategory },
  { key: "trend", label: "Transaction Trend", component: TransactionTrend },
  { key: "top", label: "Top Transactions", component: TopTransactions },
  { key: "used", label: "Most Used Category", component: MostUsedCategory },
  // { key: "savings", label: "Savings Rate", component: SavingsRate },
];

const FILTERABLE_TABS = ["spend", "income", "overview", "trend", "top"];
const TYPE_FILTER_TABS = ["top", "trend"];

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [type, setType] = useState("all");
  const [limit, setLimit] = useState(5);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dispatch = useDispatch();

  const {
    expensePerCategory,
    incomePerCategory,
    financialOverview,
    transactionTrend,
    topTransactions,
    mostUsedCategory,
    savingsRate,
    loading,
    error,
  } = useSelector((state) => state.analysis);

  useEffect(() => {
    dispatch(clearAnalysisErrors());

    const payload = { fromDate, toDate, type, limit };

    switch (activeTab) {
      case "overview":
        dispatch(fetchFinancialOverview(payload));
        break;
      case "spend":
        dispatch(fetchAmountSpendPerCategory(payload));
        break;
      case "income":
        dispatch(fetchAmountIncomePerCategory(payload));
        break;
      case "trend":
        dispatch(fetchTransactionTrend(payload));
        break;
      case "top":
        dispatch(fetchTopTransactions(payload));
        break;
      case "used":
        dispatch(fetchMostUsedCategory());
        break;
      default:
        console.warn(`Unhandled activeTab: ${activeTab}`);
        break;
    }
  }, [activeTab, dispatch, fromDate, toDate, type, limit]);

  const handleApplyFilter = () => {
    const payload = { fromDate, toDate, type, limit };

    switch (activeTab) {
      case "overview":
        dispatch(fetchFinancialOverview(payload));
        break;
      case "spend":
        dispatch(fetchAmountSpendPerCategory(payload));
        break;
      case "income":
        dispatch(fetchAmountIncomePerCategory(payload));
        break;
      case "trend":
        dispatch(fetchTransactionTrend(payload));
        break;
      case "top":
        dispatch(fetchTopTransactions(payload));
        break;
      default:
        break;
    }
  };

  const CurrentAnalysisComponent = useMemo(() => {
    const tab = TABS.find(t => t.key === activeTab);
    return tab ? tab.component : null;
  }, [activeTab]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <div className="w-full md:w-56 flex-shrink-0 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis Views</h2>
        <nav className="space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`w-full py-2 px-3 rounded-md text-left font-medium transition-all duration-200 ease-in-out
                ${activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700"
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 bg-white rounded-lg p-5 md:p-6 shadow-md border border-gray-200">
        {FILTERABLE_TABS.includes(activeTab) && (
          <div className="flex flex-wrap items-end gap-3 md:gap-4 mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex-grow min-w-[150px]">
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-2 text-gray-800"
              />
            </div>
            <div className="flex-grow min-w-[150px]">
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-2 text-gray-800"
              />
            </div>

            {TYPE_FILTER_TABS.includes(activeTab) && (
              <div className="flex-grow min-w-[120px]">
                <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="transactionType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-2 text-gray-800"
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            )}

            {activeTab === "top" && (
              <div className="flex-grow min-w-[80px]">
                <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                <input
                  id="limit"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value) || 1)}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-2 text-gray-800"
                  min="1"
                  max="100"
                />
              </div>
            )}

            <button
              onClick={handleApplyFilter}
              className="mt-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out"
            >
              Apply Filter
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-5 text-gray-900">
          {TABS.find(t => t.key === activeTab)?.label}
        </h2>

        {CurrentAnalysisComponent && (
          <div className="mt-4 text-gray-800">
            <CurrentAnalysisComponent
              overview={financialOverview}
              data={
                activeTab === "spend" ? expensePerCategory :
                activeTab === "income" ? incomePerCategory :
                activeTab === "trend" ? transactionTrend :
                activeTab === "top" ? topTransactions :
                null
              }
              category={mostUsedCategory}
              rate={savingsRate}
              type={type}
              limit={limit} 
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;