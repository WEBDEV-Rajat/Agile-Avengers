import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RecurringTransaction = () => {
  const [list, setList] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    frequency: "",
    nextDueDate: "",
    note: "",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [upcoming, setUpcoming] = useState([]);
  const [days, setDays] = useState(7);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = "http://localhost:5000/api/v1/category/get-all-expense";
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setCategories(response.data.data);
      } catch (error) {
        setError("Error fetching categories.");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getUpcomingTransactions = async () => {
      try {
        const url = "http://localhost:5000/api/v1/reoccuring/get-upcoming";
        const response = await axios.post(
          url,
          { days },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setUpcoming(response.data.data);
      } catch (error) {
        setError("Error fetching upcoming transactions.");
      }
    };

    getUpcomingTransactions();
  }, [days]);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const url = "http://localhost:5000/api/v1/reoccuring/get-all";
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setList(response.data.data);
      } catch (error) {
        setError("Error fetching all transactions.");
      }
    };

    getAllTransactions();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

      const url = "http://localhost:5000/api/v1/reoccuring/add-transaction";
      const response = await axios.post(url, transactionData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      setList([...list, response.data.data]);
      setNewTransaction({
        amount: "",
        category: "",
        frequency: "",
        nextDueDate: "",
        note: "",
      });
      toast.success(response.data.message);

      setActiveTab("all");
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data?.message);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigationbar />

      <div className="flex flex-grow mt-5">
        <div className="w-64 bg-gray-100 p-6 space-y-6 border-r mt-10 border-gray-300 shadow-lg rounded-lg fixed h-full">
          <h2 className="text-xl font-semibold text-gray-800">
            Recurring Transactions
          </h2>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 ${
              activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("all")}
          >
            See All
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 ${
              activeTab === "new"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("new")}
          >
            Add New
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("upcoming")}
          >
            See Upcoming
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto ml-64">
          {activeTab === "all" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                All Recurring Transactions
              </h2>
              {error && <p className="text-red-500">{error}</p>}
              <ul className="space-y-4">
                {list.map((transaction) => (
                  <li
                    key={transaction._id}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold">
                        ₹{transaction.amount} - {transaction.category?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Next Due: {formatDate(transaction.nextDueDate)}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{transaction.note}</p>
                    <Link to={`/card/${transaction._id}`}>
                      <button className="mt-2 text-blue-500 hover:text-blue-700 border border-blue-500 py-1 px-3 rounded-full focus:ring-2 focus:ring-blue-500 transition duration-300">
                        Manage
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "new" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Add New Transaction
              </h2>
              <form onSubmit={handleNewTransactionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                    placeholder="Amount"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                      })
                    }
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
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    required
                    value={newTransaction.frequency}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        frequency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Next Due Date
                  </label>
                  <input
                    type="date"
                    value={newTransaction.nextDueDate}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        nextDueDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Note
                  </label>
                  <textarea
                    value={newTransaction.note}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        note: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any notes"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  Add Transaction
                </button>
              </form>
            </div>
          )}

          {activeTab === "upcoming" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Upcoming Transactions
              </h2>
              {upcoming.length > 0 ? (
                upcoming.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg mb-4"
                  >
                    <p className="text-lg font-semibold">
                      ₹{transaction.amount} - {transaction.category?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Next Due: {formatDate(transaction.nextDueDate)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No upcoming transactions.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringTransaction;
