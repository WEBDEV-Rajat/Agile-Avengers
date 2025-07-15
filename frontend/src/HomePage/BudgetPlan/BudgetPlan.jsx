import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";  

const BudgetPlan = () => {
  const [list, setList] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    limit: "",
    period: "",
    category: "",
    nextDueDate: "",
    note: ""
  });
  const [activeTab, setActiveTab] = useState("all");
  const [upcoming, setUpcoming] = useState([]);
  const [days, setDays] = useState(7);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const getList = async () => {
      try {
        const url = "https://expenseguru-backend.onrender.com/api/v1/budget/get-details";
        const response = await axios.get(url, { withCredentials: true });
        setList(response.data.data);
      } catch {
        setError("Error fetching budget plans.");
      }
    };
    getList();
  }, []);

  useEffect(() => {
    const getUpcomingTransactions = async () => {
      try {
        const url = "https://expenseguru-backend.onrender.com/api/v1/reoccuring/get-upcoming";
        const response = await axios.post(url, { days }, { withCredentials: true });
        setUpcoming(response.data.data);
      } catch {
        setError("Error fetching upcoming transactions.");
      }
    };
    getUpcomingTransactions();
  }, [days]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const url = "https://expenseguru-backend.onrender.com/api/v1/category/get-all-expense";
        const response = await axios.get(url, { withCredentials: true });
        setCategories(response.data.data);
      } catch {
        setError("Error fetching categories.");
      }
    };
    getAllCategories();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false); 
  };

  const handleNewTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category._id === newTransaction.category
      );

      const transactionData = {
        ...newTransaction,
        category: selectedCategory ? selectedCategory.name : "",
      };

      const url = "https://expenseguru-backend.onrender.com/api/v1/budget/add-new";
      const response = await axios.post(url, transactionData, { withCredentials: true });

      setList([...list, response.data.data]);
      setNewTransaction({
        limit: "",
        category: "",
        period: "",
        nextDueDate: "",
        note: ""
      });
      toast.success(response.data.message);
      setActiveTab("all");
    } catch {
      setError("Error adding transaction.");
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigationbar />

      <div className="md:hidden flex mt-20 justify-between items-center p-4 bg-white shadow">
        <h2 className="text-lg font-semibold">Budget Plans</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow p-4 space-y-2">
          {["all", "new", "upcoming"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`block w-full text-left px-4 py-2 rounded ${
                activeTab === tab ? "bg-blue-500 text-white" : "text-gray-700 bg-gray-100"
              }`}
            >
              {tab === "all" ? "See All" : tab === "new" ? "Add New" : "See Upcoming"}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-grow mt-5">
        <div className="mt-16 hidden md:block w-64 bg-gray-100 p-6 space-y-6 border-r border-gray-300 shadow-lg rounded-lg h-full fixed">
          <h2 className="heading text-xl font-semibold">Budget Plans</h2>
          {["all", "new", "upcoming"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-full text-left py-2 px-4 rounded-lg ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab === "all" ? "See All" : tab === "new" ? "Add New" : "See Upcoming"}
            </button>
          ))}
        </div>

        <div className="flex-grow p-6 overflow-y-auto ml-0 md:ml-64">
          {activeTab === "all" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">All Budget Plans</h2>
              {list.map((transaction) => (
                <div key={transaction._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">Limit: ₹{transaction.limit}</p>
                  <p>Category: {transaction.categoryId?.name} {transaction.categoryId?.icon}</p>
                  <p>Period: {transaction.period}</p>
                  <p>Next Due Date: {formatDate(transaction.nextDueDate)}</p>
                  <Link to={`/budget/${transaction._id}`}>
                    <button className="mt-2 text-blue-500 hover:text-blue-700 border border-blue-500 py-1 px-3 rounded-full">
                      Manage
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === "new" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">Add New Budget Plan</h2>
              <form onSubmit={handleNewTransactionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount Limit</label>
                  <input
                    type="number"
                    value={newTransaction.limit}
                    onChange={(e) => setNewTransaction({ ...newTransaction, limit: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount Limit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Period</label>
                  <select
                    value={newTransaction.period}
                    onChange={(e) => setNewTransaction({ ...newTransaction, period: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Period</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Due Date</label>
                  <input
                    type="date"
                    value={newTransaction.nextDueDate}
                    onChange={(e) => setNewTransaction({ ...newTransaction, nextDueDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Note</label>
                  <textarea
                    value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 hover:bg-blue-600"
                >
                  Add Budget Plan
                </button>
              </form>
            </div>
          )}

          {activeTab === "upcoming" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">Upcoming Budget Plans</h2>
              {upcoming.map((transaction) => (
                <div key={transaction._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">Limit: ₹{transaction.limit}</p>
                  <p>Category: {transaction.categoryId?.name} {transaction.categoryId?.icon}</p>
                  <p>Period: {transaction.period}</p>
                  <p>Due on: {formatDate(transaction.nextDueDate)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlan;
