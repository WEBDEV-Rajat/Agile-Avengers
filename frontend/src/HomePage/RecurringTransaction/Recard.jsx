import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Recard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const url = `https://expenseguru-backend.onrender.com/api/v1/reoccuring/get-details/${id}`;
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        setTransaction(response.data.data);
        setFormData(response.data.data);
        // toast.success(response.data.message)

             } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://expenseguru-backend.onrender.com/api/v1/reoccuring/update-transaction/${id}`;
      const response = await axios.put(url, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      setTransaction(response.data.data);
      setIsEditing(false);
      navigate(-1);
    } catch (error) {
      console.error('Error updating transaction:', error);
      
    }
  };

  const handleDelete = async () => {
    
      try {
        const url = `https://expenseguru-backend.onrender.com/api/v1/reoccuring/delete/${id}`;
        const response = await axios.delete(url, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success(response.data.message)
        
        navigate(-1);
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction');
      }
    
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit Recurring Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
        </div>
        <div className="flex items-center mt-4">
          <label className="mr-2 text-sm font-medium text-gray-600">Active:</label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active || false}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-5 h-5 text-blue-500 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className={`px-4 py-2 rounded-md focus:outline-none ${
              isEditing ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default Recard;
