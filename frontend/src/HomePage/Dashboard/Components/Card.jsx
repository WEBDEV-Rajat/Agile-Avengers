import React from 'react';
import { Link } from "react-router-dom";

function Card({ _id, type, category, amount, date }) {
  return (
    <div
      className="p-4 bg-white shadow-md rounded-md hover:bg-gray-100 transition"
    >
      <Link to={`/transaction/${_id}`} >
        <p className="text-gray-700">
          <span className="font-semibold">{type}</span> -{" "}
          <span className="text-blue-600">{category?.name}</span> -{" "}
          <span className="text-blue-600">{category?.icon}</span> -{" "}

          <span className={type === "expense" ? "text-red-600" : "text-green-600 font-semibold"}> ₹{amount}</span> -{" "}
          <span className="text-gray-500">{new Date(date).toLocaleDateString()}</span>
        </p>
      </Link>
    </div>
  );
}

export default Card;
