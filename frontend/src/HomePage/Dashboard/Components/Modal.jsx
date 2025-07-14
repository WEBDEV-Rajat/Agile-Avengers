import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ data, type, onClose, onSave }) => {
  const isView = type === "view";

  const [formData, setFormData] = useState({
    type: data?.type || "",
    amount: data?.amount || 0,
    date: data?.date ? data.date.split("T")[0] : "",
    note: data?.note || "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        type: data.type || "",
        amount: data.amount || 0,
        date: data.date ? data.date.split("T")[0] : "",
        note: data.note || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/v1/transaction/edit-transaction/${data._id}`,
        {
          type: formData.type,
          category: data.category?.name,
          amount: formData.amount,
          note: formData.note,
          date: formData.date,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Transaction updated successfully");
      onSave();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update transaction");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-sm md:max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <h2 className="text-lg md:text-xl font-bold mb-4">
            {isView ? "View Transaction" : "Edit Transaction"}
          </h2>

          <div className="space-y-3 text-sm md:text-base">
            <div>
              <label className="font-medium">Type:</label>
              {isView ? (
                <p>{formData.type}</p>
              ) : (
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              )}
            </div>

            <div>
              <label className="font-medium">Category:</label>
              <p>{data.category?.name}</p>
            </div>

            <div>
              <label className="font-medium">Amount:</label>
              {isView ? (
                <p>{formData.amount}</p>
              ) : (
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              )}
            </div>

            <div>
              <label className="font-medium">Date:</label>
              {isView ? (
                <p>{new Date(formData.date).toLocaleDateString()}</p>
              ) : (
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              )}
            </div>

            <div>
              <label className="font-medium">Note:</label>
              {isView ? (
                <p>{formData.note}</p>
              ) : (
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-500 text-white rounded text-xs md:text-sm"
              >
                Close
              </button>
              {!isView && (
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs md:text-sm"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
