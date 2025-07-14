import React, { useEffect, useState } from 'react';
import Navigationbar from '../Navigationbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ExpenseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = "http://localhost:5000/api/v1/category/get-all-expense";
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setCategories(response.data.data);
      } catch (error) {
        setError("Error fetching categories.");
      }
    };
    getCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const url = `http://localhost:5000/api/v1/category/delete-category/${categoryId}`;
      await axios.delete(url, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setCategories(categories.filter((category) => category._id !== categoryId));
      toast.success("Category deleted successfully.");
    } catch (error) {
      setError("Error deleting category.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigationbar />

      <div className="relative top-20 w-full max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Manage Your Expense Categories</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <motion.ul 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
        >
          {categories.map((category) => (
            <motion.li 
              key={category._id}
              className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <p className="text-lg font-semibold text-gray-700">{category.name}</p>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default ExpenseCategories;
