import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAmountSpendPerCategory,
  fetchAmountIncomePerCategory,
  fetchFinancialOverview,
  fetchTransactionTrend,
  fetchTopTransactions,
  fetchMostUsedCategory,
  clearAnalysisErrors,
} from "../../redux/Slices/analysis.slices.js";

import FinancialOverview from "./Components/FinancialOverview.jsx";
import SpendPerCategory from "./Components/SpendPerCategory.jsx";
import IncomePerCategory from "./Components/IncomePerCategory.jsx";
import TransactionTrend from "./Components/TransactionTrend.jsx";
import TopTransactions from "./Components/TopTransactions.jsx";
import MostUsedCategory from "./Components/MostUsedCategory.jsx";
import Navigationbar from "../Navigationbar.jsx";
import { Menu, X } from "lucide-react";

const TABS = [
  { key: "overview", label: "Financial Overview", component: FinancialOverview },
  { key: "spend", label: "Expense per Category", component: SpendPerCategory },
  { key: "income", label: "Income per Category", component: IncomePerCategory },
  { key: "trend", label: "Transaction Trend", component: TransactionTrend },
  { key: "top", label: "Top Transactions", component: TopTransactions },
  { key: "used", label: "Most Used Category", component: MostUsedCategory },
];

const FILTERABLE_TABS = ["spend", "income", "overview", "trend", "top"];
const TYPE_FILTER_TABS = ["top", "trend"];

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [type, setType] = useState("all");
  const [limit, setLimit] = useState(5);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    expensePerCategory,
    incomePerCategory,
    financialOverview,
    transactionTrend,
    topTransactions,
    mostUsedCategory,
    loading,
    error,
  } = useSelector((state) => state.analysis);

  useEffect(() => {
    dispatch(clearAnalysisErrors());
    fetchData();
  }, [activeTab, dispatch, fromDate, toDate, type, limit]);

  const fetchData = () => {
    const payload = { fromDate, toDate, type, limit };
    switch (activeTab) {
      case "overview": dispatch(fetchFinancialOverview(payload)); break;
      case "spend": dispatch(fetchAmountSpendPerCategory(payload)); break;
      case "income": dispatch(fetchAmountIncomePerCategory(payload)); break;
      case "trend": dispatch(fetchTransactionTrend(payload)); break;
      case "top": dispatch(fetchTopTransactions(payload)); break;
      case "used": dispatch(fetchMostUsedCategory()); break;
      default: break;
    }
  };

  const CurrentAnalysisComponent = useMemo(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    return tab ? tab.component : null;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigationbar />

      <div className="max-w-7xl mx-auto p-4">
        <div className="md:hidden flex justify-between items-center mb-4 mt-20">
          <h2 className="text-xl font-bold">Analysis Views</h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            <Menu size={20} />
          </button>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex gap-4">
          <aside
            className={`fixed mt-16 top-0 left-0 h-full w-64 bg-white p-4 z-40 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0 md:w-60 md:h-auto border md:border-0 shadow-md md:shadow-none transition-transform duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center md:hidden mb-4">
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              <h1 className="text-xl font-bold mb-5">Analysis Views</h1>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`block w-full text-left font-semibold px-3 py-2 rounded-md ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex flex-col flex-1 mt-16 bg-white p-5 rounded-lg shadow-md border md:mt-16 sm:mt-1">
            {FILTERABLE_TABS.includes(activeTab) && (
              <div className="flex flex-wrap gap-3 bg-gray-50 p-4 rounded-md border mb-5 sm:mt-1">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border p-2 rounded-md flex-grow min-w-[140px]"
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border p-2 rounded-md flex-grow min-w-[140px]"
                />
                {TYPE_FILTER_TABS.includes(activeTab) && (
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 rounded-md flex-grow min-w-[120px]"
                  >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                )}
                {activeTab === "top" && (
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    min="1"
                    max="100"
                    className="border p-2 rounded-md flex-grow min-w-[80px]"
                    placeholder="Limit"
                  />
                )}
                <button
                  onClick={fetchData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply Filter
                </button>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4">{TABS.find((t) => t.key === activeTab)?.label}</h2>

            {CurrentAnalysisComponent && (
              <CurrentAnalysisComponent
                overview={financialOverview}
                data={
                  activeTab === "spend"
                    ? expensePerCategory
                    : activeTab === "income"
                    ? incomePerCategory
                    : activeTab === "trend"
                    ? transactionTrend
                    : activeTab === "top"
                    ? topTransactions
                    : null
                }
                category={mostUsedCategory}
                loading={loading}
                error={error}
                type={type}
                limit={limit}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
