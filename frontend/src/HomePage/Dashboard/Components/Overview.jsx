import "./Overview.css";
import img1 from "./assets/img-1.avif";
import img2 from "./assets/img-2.png";
import img3 from "./assets/img-3.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Overview = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [expense, setExpense] = useState([["Category", "Amount"]]);
  const [income, setIncome] = useState([["Category", "Amount"]]);

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
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching total data:", error);
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
        const incomeData = response.data.data || [];

        // Check and transform income data to the format required by Google Charts
        const transformedIncome = [["Category", "Amount"]];
        incomeData.forEach((item) => {
          if (item.category && typeof item.total === "number") {
            transformedIncome.push([item.category, item.total]);
          } else {
            console.warn("Skipping income item with missing fields:", item);
          }
        });

        if (transformedIncome.length > 1) {
          setIncome(transformedIncome);
        }
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
        const expenseData = response.data.data || [];

        // Check and transform expense data to the format required by Google Charts
        const transformedExpense = [["Category", "Amount"]];
        expenseData.forEach((item) => {
          if (item.category && typeof item.total === "number") {
            transformedExpense.push([item.category, item.total]);
          } else {
            console.warn("Skipping expense item with missing fields:", item);
          }
        });

        if (transformedExpense.length > 1) {
          setExpense(transformedExpense);
        }
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchData();
    fetchIncome();  
    fetchExpense();
  }, []);

  if (!data || income.length <= 1 || expense.length <= 1) {
    return <div>Loading...</div>;
  }

  const incomeOptions = {
    title: "Incomes By Category",
    pieHole: 0.4,
    is3D: false,
  };

  const expenseOptions = {
    title: "Expenses By Category",
    pieHole: 0.4,
    is3D: false,
  };

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
          <div className="incomes">
            <Chart
              chartType="PieChart"
              width="100%"
              height="299px"
              data={income}
              options={incomeOptions}
            />
          </div>
        </div>
        <div className="expbycat">
          <div className="expenses">
            <Chart
              chartType="PieChart"
              width="100%"
              height="299px"
              data={expense}
              options={expenseOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
