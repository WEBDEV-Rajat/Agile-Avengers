import React from "react";

const TopTransactions = ({ trendData, fromDate, toDate }) => {
  if (!Array.isArray(trendData)) {
    console.error("trendData is not an array:", trendData);
    return <p>No transactions to display</p>;
  }

  const filteredTransactions = trendData.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate >= new Date(fromDate) && txDate <= new Date(toDate);
  });

  const sortedTransactions = filteredTransactions.sort((a, b) => b.total - a.total);

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Top Transactions</h3>
      {sortedTransactions.length === 0 ? (
        <p>No transactions to display</p>
      ) : (
        <ul>
          {sortedTransactions.map((tx) => (
            <li key={tx._id}>
              {tx.type.toUpperCase()} - ₹{tx.total} on {new Date(tx.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopTransactions;
