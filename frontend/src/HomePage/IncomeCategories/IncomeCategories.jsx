import React, { useEffect, useState } from 'react';
import Navigationbar from '../Navigationbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const IncomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = "http://localhost:5000/api/v1/category/get-all-income";
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
  }, [categories]);

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
      <div className="bg-green-500 text-white p-4">
        <h1 className="text-3xl font-semibold">Manage Your Income Categories</h1>
      </div>
      <Navigationbar />

      <div className="p-6 mt-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Income Categories</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">{category.name}</p>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-500 hover:text-red-700 border border-red-500 py-1 px-3 rounded-full focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeCategories;
