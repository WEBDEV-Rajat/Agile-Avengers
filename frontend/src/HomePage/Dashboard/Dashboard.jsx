import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import Overview from "./Components/Overview";
import History from "./Components/History";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import AddCategory from "./Components/AddCategory";
import { GetUser } from "../../redux/Slices/user.slices.js";
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

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetUser());
    refreshIncomeCategories();
    refreshExpenseCategories();
  }, [dispatch]);

  const resetForm = () => {
    setAmount(null);
    setCategory(null);
    setNote(null);
    setDate(null);
  };

  const handleTransaction = async (type) => {
    const form = { amount, category, note, date, type };
    try {
      const response = await axios.post(
        "https://expenseguru-backend.onrender.com/api/v1/transaction/add-transaction",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setTransactionTrigger((prev) => prev + 1);
      resetForm();
      type === "income" ? setIsIncomeOpen(false) : setIsExpenseOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || `Failed to add ${type}`);
    }
  };

  const refreshIncomeCategories = async () => {
    const res = await axios.get("https://expenseguru-backend.onrender.com/api/v1/category/get-all-income", { withCredentials: true });
    setIncomeCategories(res.data.data);
  };

  const refreshExpenseCategories = async () => {
    const res = await axios.get("https://expenseguru-backend.onrender.com/api/v1/category/get-all-expense", { withCredentials: true });
    setExpenseCategories(res.data.data);
  };

  const popupAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const renderTransactionPopup = (type) => {
    const isIncome = type === "income";
    const categories = isIncome ? incomecategories : expensecategories;
    const closePopup = isIncome ? () => setIsIncomeOpen(false) : () => setIsExpenseOpen(false);
    const refreshCategories = isIncome ? refreshIncomeCategories : refreshExpenseCategories;

    return (
      <motion.div
        className="popup-overlay"
        onClick={closePopup}
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
            Create a new <span className={isIncome ? "s1" : "s2"}>{type}</span> transaction
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
            <label>
              Amount
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label>Category</label>
            <div className="catselect">
              <select value={category || ""} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select {type} Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <AddCategory type={type} onCategoryAdded={refreshCategories} />
            </div>
            <label>
              Transaction Date
              <input
                type="date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <div className="popup-buttons">
              <button type="button" className="button2" onClick={closePopup}>
                Close
              </button>
              <button type="button" className="button1" onClick={() => handleTransaction(type)}>
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      <Navigationbar />
      <div className="relative top-[110px] flex flex-wrap justify-between font-semibold border-b border-b-slate-400 px-5 py-3">
        <h1 className="text-green-700 text-2xl mb-3">
          Welcome, {isAuthenticated ? user?.name || "User" : "loading..."}
        </h1>

        <div className="flex gap-5 flex-wrap">
          <button
            onClick={() => { resetForm(); setIsIncomeOpen(true); }}
            className="bg-[#0f664f] text-white rounded-lg pt-2 pb-2 pl-3 pr-3 shadow-md border-2 border-green-500"
          >
            New Income
          </button>
          <button
            onClick={() => { resetForm(); setIsExpenseOpen(true); }}
            className="bg-[#4b0519] text-white rounded-lg pt-1 pb-1 pl-3 pr-3 shadow-md border-2 border-[#de164f]"
          >
            New Expense
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isIncomeOpen && renderTransactionPopup("income")}
        {isExpenseOpen && renderTransactionPopup("expense")}
      </AnimatePresence>

      <Overview getUser={GetUser} incomeHandler={transactionTrigger} expenseHandler={transactionTrigger} />
      <History getUser={GetUser} transactionHandler={transactionTrigger} />
    </div>
  );
};

export default Dashboard;
