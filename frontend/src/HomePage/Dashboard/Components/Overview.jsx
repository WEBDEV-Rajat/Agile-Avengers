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
    is3D: true,
  };

  const expenseOptions = {
    title: "Expenses By Category",
    pieHole: 0.4,
    is3D: true,
  };

  return (
    <div className="mt-[130px] ">
      <div className="calendar">
        <h1 className="text-green-700 text-2xl mb-5 ml-5 font-semibold">Overview</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-5 sm:grid-cols-1 ml-5 mr-5 translate-y-3">
        <div className="border-2 border-green-400 rounded-lg">
          <img src={img1} alt="Income" className="float-left w-[90px] h-[90px] ml-2"   />
          <div className="font-semibold text-xl flex flex-col mt-5 items-center text-green-600">
            <p className="text-green-600">Income</p>
            <h2>₹{data.totalIncome}</h2>
          </div>
        </div>
        <div className="border-2 border-red-400 rounded-lg">
          <img src={img2} alt="Expense" className="float-left w-[90px] h-[90px] ml-2" />
          <div className="font-semibold text-xl flex flex-col mt-5 items-center text-red-600">
            <p className="text-red-600">Expense</p>
            <h2>₹{data.totalExpense}</h2>
          </div>
        </div>
        <div className="border-2 border-blue-400 rounded-lg">
          <img src={img3} alt="Balance" className="float-left w-[90px] h-[90px] ml-2" />
          <div className="font-semibold text-xl flex flex-col mt-5 items-center text-blue-600">
            <p className="text-blue-600">Balance</p>
            <h2>₹{data.difference}</h2>
          </div>
        </div>
      </div>
        <div className="w-full grid md:grid-cols-2 translate-y-7 mt-5 ">
          <div className="ml-2 mr-2 border border-gray-500 rounded-lg flex items-center justify-center">
            <Chart
              chartType="PieChart"
              width="95%"
              height="290px"
              data={income}
              options={incomeOptions}
            />
          </div>
          <div className="ml-2 mr-2 border border-gray-500 rounded-lg flex items-center justify-center">
            <Chart
              chartType="PieChart"
              width="95%"
              height="290px"
              data={expense}
              options={expenseOptions}
              />
          </div>
          </div>
        </div>
  );
};

export default Overview;
