
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "./Card";
const History = ({getUser}) => {
  const [history, setHistory] = useState([]);
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [categories, setCategories] = useState([]);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/transaction/get-all",
          { category, type },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setHistory(response.data.data);
        console.log("history data :", response.data.data);
        
      } catch (error) {
        toast.warning(error?.response?.data?.message || "An error occurred");
      }
    };
    fetchHistory();
  }, [type, category, getUser]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("satjkhjcxvnhjdgskmxcnhj");

        const url =
          type === "income"
            ? "http://localhost:5000/api/v1/category/get-all-income"
            : "http://localhost:5000/api/v1/category/get-all-expense";

        const response = await axios.get(url, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setCategories(response.data.data);
        console.log("fgdhfwgjkdfbcv bm:", response.data.data);
      } catch (error) {
        console.log(
          error.response?.data?.message || "Error fetching categories"
        );
      }
    };

    if (type !== "all") {
      fetchCategories();
    }
  }, [type]);

  return (
    <div className="relative top-16 p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-green-700 mb-4">History</h1>

      <div className="filters flex space-x-4 mb-6">
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="filter-select bg-white border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="filter-select bg-white border border-gray-300 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((item, index) => <Card key={index} {...item} />)
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
