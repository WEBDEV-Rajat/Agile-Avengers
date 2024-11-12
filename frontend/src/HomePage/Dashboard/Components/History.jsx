import './History.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const History = () => {

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );
  console.log("state::", user);
  console.log("isAhistoyuthenticated:", isAuthenticated);
  useEffect(() => {
    const fetchHistory = async () => {
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

    fetchHistory();
  }, []);

  return (
    <div className='history'>
      <h1>History</h1>
    </div>
  )
}

export default History;
