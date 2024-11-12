import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function TransactionDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState(null);
    
    const navigate = useNavigate()
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
                console.log("dytaskhvbjvhnc:",response.data.data);
                
                
            } catch (error) {
                console.error("Error fetching transaction details:", error.response?.data?.message || error.message);
            }
        };

        getDetails();
    }, [id]);

    const handleEdit = async () => {
        if (isEditing) {
           console.log("detaildsfdbgvn:",editedDetails);
           let xyz = {}
           xyz.type = editedDetails.type
                xyz.name = editedDetails.category.name
                xyz.amount = editedDetails.amount
                xyz.note= editedDetails.note
                xyz.date = editedDetails.date
                console.log("Transaction data:", xyz);
            try {
                const url = `http://localhost:5000/api/v1/transaction/edit-transaction/${id}`;
                const response = await axios.post(url, xyz, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });
                setDetails(response.data.data);
                setEditedDetails(response.data.data);
                console.log("Saved transaction:", response.data.data);
            } catch (error) {
                console.error("Error saving transaction:", error.response?.data?.message || error.message);
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
            console.log("Deleted transaction:", response.data);
            toast.success(response.data.message)
            navigate("/dashboard")
        } catch (error) {
            console.error("Error deleting transaction:", error.response?.data?.message || error.message);
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</h2>
                {details ? (
                    <div className="space-y-2">
                        <p><strong>Type:</strong> 
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="type"
                                    value={editedDetails.type}
                                    onChange={handleChange}
                                    className="border rounded p-1"
                                />
                            ) : (
                                details.type
                            )}
                        </p>
                        <p className="flex items-center">
                            <strong>Category:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="category"
                                    value={editedDetails.category?.name || ""}
                                    onChange={handleChange}
                                    className="border rounded p-1 ml-2 mr-2"
                                />
                            ) : (
                                <span className="ml-2 mr-2">{details.category?.name || "No Category"}</span>
                            )}
                            <span>{details.category?.icon}</span>
                        </p>
                        <p><strong>Amount:</strong> 
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
                        <p><strong>Date:</strong> {new Date(details.date).toLocaleDateString()}</p>
                        <p><strong>Date:</strong>{details.note}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading transaction details...</p>
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
