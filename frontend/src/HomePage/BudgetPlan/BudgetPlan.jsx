import React from 'react'
import Navigationbar from '../Navigationbar';
import "./Budgetplan.css"

const BudgetPlan = () => {
    return (
      <div>
        <Navigationbar />
      <div className="budget">
        <h1 className='heading'>Create Budget Plan</h1>
      <form action="">
        <div className="fields">
      <div>
      <h1>Category</h1>
      <select name="" id="" required>
        <option>Select Category</option>
        <option value=""></option>
      </select>
      </div>
      <div>
      <h1>Limit</h1>
      <input type="number" required />
      </div>
      <div>
        <h1>Period</h1>
        <select name="" id="" required>
        <option>Select Period</option>
        <option value="">Weekly</option>
        <option value="">Monthly</option>
        <option value="">Yearly</option>
      </select>
      </div>
      <div>
      <h1>Date</h1>
      <input type="date" required />
      </div>
      </div>
        <button type="submit" className="submit">Add Budget</button>
      </form>
    
    </div>
      </div>
    )
  };
  

export default BudgetPlan;
