import React from 'react';
// import {DayPicker} from "react-day-picker";
import "./Overview.css";
import img1 from './assets/img-1.avif';
import img2 from './assets/img-2.png';
import img3 from './assets/img-3.png';

const Overview = () => {
  return (
    <div className='overview'>
      <div className='calendar'>
      <h1>Overview</h1>
      </div>
      <div className='incexpbal'>
      <div className='Income'>
    <img src={img1} alt="Income" />
        <div className="Amount">
        <p>Income</p>
        <h2>$0.00</h2>
        </div>
      </div>
      <div className='Expense'>
      <img src={img2} alt="Expense" />
      <div className="Amount">
        <p>Expense</p>
        <h2>$0.00</h2>
        </div>
      </div>
      <div className='Balance'>
       <img src={img3} alt="Balance" />
       <div className="Amount">
        <p>Balance</p>
        <h2>$0.00</h2>
       </div>
      </div>
      </div>

      <div className="incexpbycat">
        <div className="incbycat">
          <p className='p1'>Incomes By Category</p>
          <div className="incomes">
             <p className='p2'>No data for the selected period</p>
             <p className='p3'>Try selecting a different period or try adding new incomes</p>
          </div>
        </div>
        <div className="expbycat">
          <p className='p1'>Expenses By Category</p>
          <div className="expenses">
            <p className='p2'>No data for the selected period</p>
            <p className='p3'>Try selecting a different period or try adding new expenses</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
