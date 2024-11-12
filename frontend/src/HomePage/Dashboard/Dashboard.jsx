import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import "./Dashboard.css";
import Overview from "./Components/Overview";
import History from "./Components/History";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AddCategory from "./Components/AddCategory";

const Dashboard = () => {
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(null);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [incomecategories, setIncomeCategories] = useState([]);
  const [expensecategories, setExpenseCategories] = useState([]);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const openIncomePopup = () => setIsIncomeOpen(true);
  const closeIncomePopup = () => setIsIncomeOpen(false);
  const openExpensePopup = () => setIsExpenseOpen(true);
  const closeExpensePopup = () => setIsExpenseOpen(false);


  const incomeHandler = async () => {
    const form = new FormData();
    form.append("amount", amount);
    form.append("category", category);
    form.append("note", note);
    form.append("date", date);
    form.append("type", "income");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setAmount(null);
      setCategory(null);
      setNote(null);
      setDate(null);

      closeIncomePopup();
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };

  const expenseHandler = async () => {
    const form = new FormData();
    form.append("amount", amount);
    form.append("category", category);
    form.append("note", note);
    form.append("date", date);
    form.append("type", "expense");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setAmount(null);
      setCategory(null);
      setNote(null);
      setDate(null);

      closeExpensePopup();
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/get-all-income",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setIncomeCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/category/get-all-expense",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Fetched Expense Categories:", response.data.data);
        setExpenseCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchIncomeCategories();
    fetchExpenseCategories();
  }, []);

  console.log("Income Categories:", incomecategories);
  console.log("Expense Categories:", expensecategories);

  return (
    <div className="dashboard">
      <Navigationbar />
      <div className="Hellouser">
        <h1 className="hello">Hello, {user?.name || "A"}!</h1>
        <div className="buttons">
          <button className="income" onClick={openIncomePopup}>
            New Income
          </button>
          {isIncomeOpen && (
            <div className="popup-overlay" onClick={closeIncomePopup}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>
                  Create a new <span className="s1">income</span> transaction
                </h2>
                <form>
                  <label>
                    Description
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Amount
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>Category</label>
                  <div className="catselect">
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select income Categories</option>
                      {incomecategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <AddCategory/>
                  </div>
                  <label>
                    Transaction Date
                    <input
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    className="button2"
                    onClick={closeIncomePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="button1"
                    onClick={incomeHandler}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <button className="expense" onClick={openExpensePopup}>
            New Expense
          </button>
          {isExpenseOpen && (
            <div className="popup-overlay" onClick={closeExpensePopup}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>
                  Create a new <span className="s2">expense</span> transaction
                </h2>
                <form>
                  <label>
                    Description
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    Amount
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>Category</label>
                  <div className="catselect">
                    <select
                      value={category || ""}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select expense Categories</option>
                      <AddCategory />
                      {expensecategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label>
                    Transaction Date
                    <input
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <button
                    className="button2"
                    type="button"
                    onClick={closeExpensePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="button1"
                    onClick={expenseHandler}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Overview />
      <History />
    </div>
  );
};

export default Dashboard;
