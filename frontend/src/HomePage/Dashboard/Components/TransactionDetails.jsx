import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TransactionDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(null);

  const navigate = useNavigate();

  const categories = [
    { name: "Groceries", icon: "🛒" },
    { name: "Utilities", icon: "💡" },
    { name: "Salary", icon: "💰" },
    { name: "Rent", icon: "🏠" },

  ];

  useEffect(() => {
    const getDetails = async () => {
      try {
        const url = `http://localhost:5000/api/v1/transaction/get-details/${id}`;
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setDetails(response.data.data);
        setEditedDetails(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching transaction details:",
          error.response?.data?.message || error.message
        );
      }
    };

    getDetails();
  }, [id]);

  const handleEdit = async () => {
    if (isEditing) {
      const xyz = {
        type: editedDetails.type,
        category: details.category.name, 
        amount: editedDetails.amount,
        note: editedDetails.note,
        date: editedDetails.date,
      };
      console.log("ajskdfjvb:",xyz);
      
      try {
        const url = `http://localhost:5000/api/v1/transaction/edit-transaction/${id}`;
        const response = await axios.post(url, xyz, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setDetails(response.data.data);
        setEditedDetails(response.data.data);
        toast.success("Transaction updated successfully");
      } catch (error) {
        console.error(
          "Error saving transaction:",
          error.response?.data?.message || error.message
        );
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      const url = `http://localhost:5000/api/v1/transaction/delete-transaction/${id}`;
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error deleting transaction:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transaction Details
        </h2>
        {details ? (
          <div className="space-y-2">
            <p>
              <strong>Type:</strong>
              {isEditing ? (
                <select
                  name="type"
                  value={editedDetails.type}
                  onChange={handleChange}
                  className="border rounded p-1"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              ) : (
                details.type
              )}
            </p>
            <p className="flex items-center">
              <strong>Category:</strong>
              {isEditing ? (
                <select
                  name="category"
                  value={editedDetails.category?.name || ""}
                  onChange={handleChange}
                  disabled // Disable to make it unchangeable
                  className="border rounded p-1 ml-2 mr-2"
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="ml-2 mr-2">
                  {details.category?.name}
                </span>
              )}
              <span>{details.category?.icon}</span>
            </p>
            <p>
              <strong>Amount:</strong>
              {isEditing ? (
                <input
                  type="number"
                  name="amount"
                  value={editedDetails.amount}
                  onChange={handleChange}
                  className="border rounded p-1"
                />
              ) : (
                `$${details.amount}`
              )}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(details.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Note:</strong>
              {isEditing ? (
                <textarea
                  name="note"
                  value={editedDetails.note}
                  onChange={handleChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                details.note
              )}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Loading transaction details...
          </p>
        )}

        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
