import React from 'react';
import { Link } from "react-router-dom";
import "./Navigationbar.css";

const Navigationbar = () => {
  return (
    <div className='navigationbar'>
      <h1>ExpenseGuru</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/budget-plan">Budget Plan</Link>
        <Link to="/manage">Manage</Link>

      </div>
      <div className='logout'>
        <Link to="/">Logout</Link>
      </div>
    </div>
  )
}

export default Navigationbar;