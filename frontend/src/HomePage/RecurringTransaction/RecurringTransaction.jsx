import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "https://expenseguru-backend.onrender.com/api/v1/category/get-all-expense",
          { withCredentials: true }
        );
        setCategories(res.data.data);
      } catch {
        setError("Error fetching categories.");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await axios.post(
          "https://expenseguru-backend.onrender.com/api/v1/reoccuring/get-upcoming",
          { days },
          { withCredentials: true }
        );
        setUpcoming(res.data.data);
      } catch {
        setError("Error fetching upcoming transactions.");
      }
    };
    fetchUpcoming();
  }, [days]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "https://expenseguru-backend.onrender.com/api/v1/reoccuring/get-all",
          { withCredentials: true }
        );
        setList(res.data.data);
      } catch {
        setError("Error fetching all transactions.");
      }
    };
    fetchAll();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const handleNewTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (c) => c._id === newTransaction.category
      );

      const payload = {
        ...newTransaction,
        category: selectedCategory ? selectedCategory.name : "",
      };

      const res = await axios.post(
        "https://expenseguru-backend.onrender.com/api/v1/reoccuring/add-transaction",
        payload,
        { withCredentials: true }
      );

      setList([...list, res.data.data]);
      toast.success(res.data.message);
      setNewTransaction({
        amount: "",
        category: "",
        frequency: "",
        nextDueDate: "",
        note: "",
      });
      setActiveTab("all");
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data?.message);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigationbar />

      <div className="md:hidden flex mt-20 justify-between items-center p-4 bg-white shadow">
        <h2 className="text-lg font-semibold">Recurring Transactions</h2>
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
          <h2 className="heading text-xl font-semibold">Recurring Transactions</h2>
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

        <div className="flex-grow p-6 ml-0 md:ml-64 md:mt-16 sm:mt-0">
          {activeTab === "all" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">All Recurring Transactions</h2>
              {error && <p className="text-red-500">{error}</p>}
              <ul className="space-y-4">
                {list.map((transaction) => (
                  <li
                    key={transaction._id}
                    className="p-4 bg-white border rounded-lg shadow hover:bg-blue-50"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        ₹{transaction.amount} - {transaction.category?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Next Due: {formatDate(transaction.nextDueDate)}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">{transaction.note}</p>
                    <Link to={`/card/${transaction._id}`}>
                      <button className="mt-2 text-blue-500 border border-blue-500 py-1 px-3 rounded-full hover:text-white hover:bg-blue-500 transition">
                        Manage
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "new" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Add New Transaction</h2>
              <form onSubmit={handleNewTransactionSubmit} className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, amount: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <select
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  value={newTransaction.frequency}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, frequency: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <input
                  type="date"
                  value={newTransaction.nextDueDate}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, nextDueDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Note"
                  value={newTransaction.note}
                  onChange={(e) =>
                    setNewTransaction({ ...newTransaction, note: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Add Transaction
                </button>
              </form>
            </>
          )}

          {activeTab === "upcoming" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Transactions</h2>
              {upcoming.length ? (
                upcoming.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="p-4 bg-white border rounded-lg shadow mb-4"
                  >
                    <p className="font-semibold">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringTransaction;
