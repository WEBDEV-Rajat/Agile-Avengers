import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import Overview from "./Components/Overview";
import History from "./Components/History";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AddCategory from "./Components/AddCategory";
import { login, GetUser } from "../../redux/Slices/user.slices.js";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(null);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [incomecategories, setIncomeCategories] = useState([]);
  const [expensecategories, setExpenseCategories] = useState([]);
  const dispatch = useDispatch();

  const [transactionTrigger, setTransactionTrigger] = useState(0);

  const resetForm = () => {
    setAmount(null);
    setCategory(null);
    setNote(null);
    setDate(null);
  };

  const openIncomePopup = () => {
    resetForm();
    setIsIncomeOpen(true);
  };

  const closeIncomePopup = () => setIsIncomeOpen(false);

  const openExpensePopup = () => {
    resetForm();
    setIsExpenseOpen(true);
  };

  const closeExpensePopup = () => setIsExpenseOpen(false);

  const incomeHandler = async () => {
    const form = {
      amount,
      category,
      note,
      date,
      type: "income",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Income transaction added:", response.data);
      toast.success(response.data.message);
      setTransactionTrigger((prev) => {
        console.log("Incrementing transactionTrigger to:", prev + 1);
        return prev + 1;
      });
      resetForm();
      closeIncomePopup();
    } catch (error) {
      console.error(
        "Error adding income transaction:",
        error?.response?.data?.message || error.message
      );
      toast.warning(
        error?.response?.data?.message || "Failed to add income transaction"
      );
    }
  };

  const expenseHandler = async () => {
    const form = {
      amount,
      category,
      note,
      date,
      type: "expense",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Expense transaction added:", response.data);
      toast.success(response.data.message);
      setTransactionTrigger((prev) => {
        console.log("Incrementing transactionTrigger to:", prev + 1);
        return prev + 1;
      });
      resetForm();
      closeExpensePopup();
    } catch (error) {
      console.error(
        "Error adding expense transaction:",
        error?.response?.data?.message || error.message
      );
      toast.warning(
        error?.response?.data?.message || "Failed to add expense transaction"
      );
    }
  };

  const refreshIncomeCategories = async () => {
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

  const refreshExpenseCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/get-all-expense",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setExpenseCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching expense categories:", error);
    }
  };

  useEffect(() => {
    dispatch(GetUser());
    refreshIncomeCategories();
    refreshExpenseCategories();
  }, [dispatch]);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // console.log(user);

  const popupAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div>
      <Navigationbar />
      <div className="relative top-[110px] flex flex-row justify-between font-semibold border-b border-b-slate-400 max-[530px]:flex-col max-[530px]:w-full">
        <h1 className="text-green-700 text-2xl ml-5 mb-4">
          Welcome, {isAuthenticated ? user?.name || "A" : "loading name..."}
        </h1>

        <div className="flex gap-14 mr-7 max-[530px]:gap-5 mt-3">
          <button
            className="bg-[#0f664f] text-white rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-md border-2 border-green-500 mb-1 -translate-y-4 max-[530px]:ml-5"
            onClick={openIncomePopup}
          >
            New Income
          </button>

          <AnimatePresence>
            {isIncomeOpen && (
              <motion.div
                className="popup-overlay"
                onClick={closeIncomePopup}
                variants={popupAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="popup"
                  onClick={(e) => e.stopPropagation()}
                  variants={popupAnimation}
                >
                  <h2>
                    Create a new <span className="s1">income</span> transaction
                  </h2>
                  <form>
                    <label>
                      Description
                      <input
                        type="text"
                        value={note || ""}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Amount
                      <input
                        type="number"
                        required
                        value={amount || ""}
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
                      <AddCategory
                        type="income"
                        onCategoryAdded={refreshIncomeCategories}
                      />
                    </div>
                    <label>
                      Transaction Date
                      <input
                        type="date"
                        required
                        value={date || ""}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="bg-[#4b0519] text-white rounded-lg pt-1 pb-1 pl-3 pr-3 shadow-md border-2 border-[#de164f] mb-1 -translate-y-4"
            onClick={openExpensePopup}
          >
            New Expense
          </button>

          <AnimatePresence>
            {isExpenseOpen && (
              <motion.div
                className="popup-overlay"
                onClick={closeExpensePopup}
                variants={popupAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="popup"
                  onClick={(e) => e.stopPropagation()}
                  variants={popupAnimation}
                >
                  <h2>
                    Create a new <span className="s2">expense</span> transaction
                  </h2>
                  <form>
                    <label>
                      Description
                      <input
                        type="text"
                        value={note || ""}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </label>
                    <br />
                    <label>
                      Amount
                      <input
                        type="number"
                        required
                        value={amount || ""}
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
                        {expensecategories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <AddCategory
                        type="expense"
                        onCategoryAdded={refreshExpenseCategories}
                      />
                    </div>
                    <label>
                      Transaction Date
                      <input
                        type="date"
                        required
                        value={date || ""}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Overview
        getUser={GetUser}
        incomeHandler={transactionTrigger}
        expenseHandler={transactionTrigger}
      />
      <History getUser={GetUser} transactionHandler={transactionTrigger} />
    </div>
  );
};

export default Dashboard;
