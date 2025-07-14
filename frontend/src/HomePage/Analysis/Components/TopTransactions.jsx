import React from 'react';

const TopTransactions = ({ data, limit, type, loading, error }) => {
  if (loading) {
    return <p className="text-blue-600 text-center">Loading top transactions...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }
//  console.log(data);
 
  return (
    <div className="max-h-[400px] overflow-y-auto pr-1">
      {(data || []).length > 0 ? (
        <ul className="space-y-2">
          {data.map((txn, idx) => (
            <li
              key={txn._id || idx}
              className={`flex justify-between items-center p-3 rounded-md shadow-sm border 
                ${txn.type === 'expense' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}
            >
              <div className="flex-1 pr-3">
                <p className="font-semibold text-gray-800">{txn.note || "No Note"}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {txn.category?.icon || '🔸'} {txn.category?.name || 'Unknown'} • {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`font-bold text-lg ${
                  txn.type === 'expense' ? 'text-red-700' : 'text-green-700'
                }`}
              >
                ₹{txn.amount?.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center py-4">
          No top transactions available for the selected criteria.
        </p>
      )}
    </div>
  );
};

export default TopTransactions;
