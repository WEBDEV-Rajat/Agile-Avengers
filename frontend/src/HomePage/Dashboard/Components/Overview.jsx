import "./Overview.css";
import img1 from './assets/img-1.avif';
import img2 from './assets/img-2.png';
import img3 from './assets/img-3.png';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [expense, setExpense] = useState(null);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/transaction/get-total",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
        setData(response.data.data); 
        console.log("sdhjgbn0",data);
        
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/transaction/get-income-per",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
        setIncome(response.data.data); 
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/transaction/get-expense-per",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setExpense(response.data.data); 
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchData();
    fetchIncome();
    fetchExpense();
  }, []);

  if (!data || !income || !expense) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overview">
      <div className="calendar">
        <h1>Overview</h1>
      </div>
      <div className="incexpbal">
        <div className="Income">
          <img src={img1} alt="Income" />
          <div className="Amount">
            <p>Income</p>
            <h2>₹{data.totalIncome}</h2>
          </div>
        </div>
        <div className="Expense">
          <img src={img2} alt="Expense" />
          <div className="Amount">
            <p>Expense</p>
            <h2>₹{data.totalExpense}</h2>
          </div>
        </div>
        <div className="Balance">
          <img src={img3} alt="Balance" />
          <div className="Amount">
            <p>Balance</p>
            <h2>₹{data.difference}</h2>
          </div>
        </div>
      </div>

      <div className="incexpbycat">
        <div className="incbycat">
          <p className="p1">Incomes By Category</p>
          <div className="incomes">
            {income ? (
              income.map((category, index) => (
                <div key={index}>
                  <p>{category.category}</p>
                  <p>{category.total}</p>
                  <p>{category.percentage}</p>
                </div>
              ))
            ) : (
              <p>No data for the selected period</p>
            )}
          </div>
        </div>
        <div className="expbycat">
          <p className="p1">Expenses By Category</p>
          <div className="expenses">
            {expense ? (
              expense.map((category, index) => (
                <div key={index}>
                  <p>{category.category}</p>
                  <p>{category.total}</p>
                  <p>{category.percentage}</p>
                </div>
              ))
            ) : (
              <p>No data for the selected period</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
