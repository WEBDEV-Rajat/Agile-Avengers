import React from "react";

const DateRangePicker = ({ setDateRange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="text-sm">From:</label>
        <input type="date" name="fromDate" onChange={handleChange} className="border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm">To:</label>
        <input type="date" name="toDate" onChange={handleChange} className="border p-2 rounded" />
      </div>
    </div>
  );
};

export default DateRangePicker;
