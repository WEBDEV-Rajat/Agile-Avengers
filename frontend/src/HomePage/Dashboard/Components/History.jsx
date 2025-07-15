import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 5;

const History = ({ transactionHandler }) => {
  const [history, setHistory] = useState([]);
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");

  const { user } = useSelector((state) => state.user);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/transaction/get-all",
        { category, type },
        { withCredentials: true }
      );
      setHistory(response.data.data);
    } catch (error) {
      toast.warning(error?.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (type === "all") {
      setCategories([]);
      return;
    }

    const url =
      type === "income"
        ? "http://localhost:5000/api/v1/category/get-all-income"
        : "http://localhost:5000/api/v1/category/get-all-expense";

    try {
      const response = await axios.get(url, { withCredentials: true });
      setCategories(response.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching categories"
      );
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [category, type, transactionHandler]);

  useEffect(() => {
    fetchCategories();
  }, [type]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      const url = `http://localhost:5000/api/v1/transaction/delete-transaction/${id}`;
      await axios.delete(url, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Transaction deleted successfully");
      fetchHistory();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const handleEdit = (item) => {
    setModalData(item);
    setModalType("edit");
  };

  const handleView = (item) => {
    setModalData(item);
    setModalType("view");
  };

  const handleSave = () => {
    fetchHistory();
  };

  const paginatedData = history.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

  return (
    <div className="relative top-16 p-4 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-4 text-center md:text-left">
        Transaction History
      </h1>

      <div className="filters flex flex-wrap gap-4 mb-4 justify-center md:justify-start">
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            setCategory("all");
            setType(e.target.value);
          }}
          value={type}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-sm md:text-base">
            <thead>
              <tr>
                <th className="border px-2 md:px-4 py-2 text-center">Type</th>
                <th className="border px-2 md:px-4 py-2 text-center">
                  Category
                </th>
                <th className="border px-2 md:px-4 py-2 text-center">Amount</th>
                <th className="border px-2 md:px-4 py-2 text-center">Date</th>
                <th className="border px-2 md:px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {item.type === "income" ? (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-green-500 text-green-900 font-semibold">
                        Income
                      </span>
                    ) : item.type === "expense" ? (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-red-500 text-red-900 font-semibold">
                        Expense
                      </span>
                    ) : (
                      item.type
                    )}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {item.category?.name || "N/A"}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {item.amount}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="flex flex-wrap gap-2 border px-2 md:px-4 py-2 justify-center">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleView(item)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {modalData && modalType && (
        <Modal
          data={modalData}
          type={modalType}
          onClose={() => setModalData(null)}
          onSave={handleSave}
          categories={categories}
        />
      )}
    </div>
  );
};

export default History;
