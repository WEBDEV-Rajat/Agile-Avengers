import img1 from "./assets/img-1.avif";
import img2 from "./assets/img-2.png";
import img3 from "./assets/img-3.png";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28", "#FF4444", "#8884d8"];

const Overview = ({ getUser, incomeHandler, expenseHandler }) => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/transaction/get-total", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching total data:", error);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/transaction/get-income-per", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        const transformedIncome = response.data.data.map(item => ({
          name: item.category,
          value: item.total
        }));
        setIncome(transformedIncome);
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    const fetchExpense = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/transaction/get-expense-per", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        const transformedExpense = response.data.data.map(item => ({
          name: item.category,
          value: item.total
        }));
        setExpense(transformedExpense);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchData();
    fetchIncome();
    fetchExpense();
  }, [incomeHandler, expenseHandler, getUser]);

  if (!data) return <div className="text-center mt-20 text-gray-600">Loading Overview...</div>;

  return (
    <div className="mt-[120px] px-5">
      <h1 className="text-3xl font-semibold text-green-700 mb-5 mt-5">Overview</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Income", amount: data.totalIncome, color: "green", img: img1 },
          { label: "Expense", amount: data.totalExpense, color: "red", img: img2 },
          { label: "Balance", amount: data.difference, color: "blue", img: img3 },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className={`flex items-center border-2 border-${item.color}-400 rounded-xl p-4 shadow-md bg-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, type: 'spring', stiffness: 120 }}
          >
            <img src={item.img} alt={item.label} className="w-20 h-20 mr-4 rounded-lg" />
            <div className={`text-${item.color}-600 font-semibold text-xl`}>
              <p>{item.label}</p>
              <h2>₹{item.amount}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold mb-2 text-green-600 text-center">Incomes By Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={income}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                label
              >
                {income.map((entry, index) => (
                  <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold mb-2 text-red-600 text-center">Expenses By Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expense}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                fill="#82ca9d"
                label
              >
                {expense.map((entry, index) => (
                  <Cell key={`cell-expense-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
