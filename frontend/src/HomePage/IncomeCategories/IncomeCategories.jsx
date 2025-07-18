import React, { useEffect, useState } from 'react';
import Navigationbar from '../Navigationbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const IncomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = "https://expenseguru-backend.onrender.com/api/v1/category/get-all-income";
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
      const url = `https://expenseguru-backend.onrender.com/api/v1/category/delete-category/${categoryId}`;
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
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Manage Your Income Categories</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <motion.ul 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              }
            }
          }}
        >
          {categories.map((category) => (
            <motion.li 
              key={category._id}
              className="flex justify-between items-center p-5 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <span className="text-lg font-medium text-gray-800">{category.name}</span>
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

export default IncomeCategories;
