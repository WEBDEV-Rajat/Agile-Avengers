import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>ExpenseGuru</h1>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/manage">Manage</Link>
      </div>
    </div>
  )
}

export default Navbar;