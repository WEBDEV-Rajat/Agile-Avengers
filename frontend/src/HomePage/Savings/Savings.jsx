import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Savings = () => {
  const [list, setList] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    targetAmount: "",
    goalName: "",
    deadline: "",
    note: "",
    category: ""
  });
  const [activeTab, setActiveTab] = useState("all");
  const [upcoming, setUpcoming] = useState([]);
  const [days, setDays] = useState(7);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("https://expenseguru-backend.onrender.com/api/v1/category/get-all-expense", {
          withCredentials: true
        });
        setCategories(response.data.data);
      } catch {
        setError("Error fetching categories.");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getUpcomingTransactions = async () => {
      try {
        const response = await axios.post(
          "https://expenseguru-backend.onrender.com/api/v1/reoccuring/get-upcoming",
          { days },
          { withCredentials: true }
        );
        setUpcoming(response.data.data);
      } catch {
        setError("Error fetching upcoming transactions.");
      }
    };
    getUpcomingTransactions();
  }, [days]);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await axios.get("https://expenseguru-backend.onrender.com/api/v1/saving/get-all", {
          withCredentials: true
        });
        setList(response.data.data);
      } catch {
        setError("Error fetching all transactions.");
      }
    };
    getAllTransactions();
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

      const response = await axios.post(
        "https://expenseguru-backend.onrender.com/api/v1/saving/add-goal",
        transactionData,
        { withCredentials: true }
      );

      setList([...list, response.data.data]);
      toast.success(response.data.message);

      setNewTransaction({
        targetAmount: "",
        goalName: "",
        deadline: "",
        note: "",
        category: ""
      });
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
        <h2 className="text-lg font-semibold">Savings</h2>
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
          <h2 className="heading text-xl font-semibold">Savings</h2>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">All Savings Goals</h2>
              {list.map((transaction) => (
                <div key={transaction._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">Goal: {transaction.goalName}</p>
                  <p>Target Amount: ₹{transaction.targetAmount}</p>
                  <p>Deadline: {formatDate(transaction.deadline)}</p>
                  <p>Note: {transaction.note}</p>
                  <Link to={`/card/${transaction._id}`}>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">Add New Savings Goal</h2>
              <form onSubmit={handleNewTransactionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                  <input
                    type="number"
                    value={newTransaction.targetAmount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, targetAmount: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                  <input
                    type="text"
                    value={newTransaction.goalName}
                    onChange={(e) => setNewTransaction({ ...newTransaction, goalName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input
                    type="date"
                    value={newTransaction.deadline}
                    onChange={(e) => setNewTransaction({ ...newTransaction, deadline: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Note</label>
                  <textarea
                    value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                >
                  Add Savings Goal
                </button>
              </form>
            </div>
          )}

          {activeTab === "upcoming" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mt-16">Upcoming Transactions</h2>
              {upcoming.map((transaction) => (
                <div key={transaction._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <p className="font-semibold text-lg">Goal: {transaction.goalName}</p>
                  <p>Amount: ₹{transaction.targetAmount}</p>
                  <p>Deadline: {formatDate(transaction.deadline)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Savings;
