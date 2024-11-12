import React from 'react';
import Navigationbar from '../Navigationbar';
import "./RecurringTransactions.css"

const RecurringTransaction = () => {
  return (
    <div>
      <Navigationbar/>
      <div className="input-container">
      <form action="">
        <div className="elements">
      <div className="type">
      <h1>Type</h1>
      <select name="" id=""required>
        <option value="">Select type</option>
        <option value="">Income</option>
        <option value="">Expense</option>
      </select>
      </div>
      <div className="category">
      <h1>Category</h1>
      <select name="" id="" required>
        <option>Select Category</option>
        <option value=""> + Create New Category</option>
        <option value=""></option>
      </select>
      </div>
      <div className="description">
      <h1>Description</h1>
      <input type="text" placeholder="Enter description" />
      </div>
      <div className="date">
      <h1>Date</h1>
      <input type="date" required />
      </div>
      <div className="amount">
      <h1>Amount</h1>
      <input type="number" required />
      </div>
      </div>
        <button type="submit" className="submit">Add Transaction</button>
      </form>
    
    </div>
    </div>
  )
}

export default RecurringTransaction
