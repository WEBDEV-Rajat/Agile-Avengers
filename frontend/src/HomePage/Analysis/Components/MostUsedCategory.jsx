import React from 'react';

const MostUsedCategory = ({ category, loading, error }) => {
  if (loading) {
    return <p className="text-blue-600 text-center">Loading most used category...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="text-center p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
      {category ? (
        <>
          <p className="text-blue-700 text-lg">Your most frequently used category is:</p>
          <p className="text-4xl font-extrabold text-blue-800 mt-2 capitalize">{category}</p>
        </>
      ) : (
        <p className="text-gray-600 py-4">No most used category data available.</p>
      )}
    </div>
  );
};

export default MostUsedCategory;