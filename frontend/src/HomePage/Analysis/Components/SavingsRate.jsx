import React from 'react';

const SavingsRate = ({ rate, loading, error }) => {
  if (loading) {
    return <p className="text-blue-600 text-center">Calculating savings rate...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="text-center p-6 bg-purple-50 rounded-lg shadow-sm border border-purple-200">
      <p className="text-purple-700 text-lg">Your current savings rate is:</p>
      {rate !== null && rate !== undefined ? ( 
        <p className="text-5xl font-extrabold text-purple-800 mt-2">{rate.toFixed(2)}%</p>
      ) : (
        <p className="text-gray-600 py-4">Savings rate not available.</p>
      )}
    </div>
  );
};

export default SavingsRate;