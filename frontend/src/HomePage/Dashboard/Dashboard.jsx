import React, {useState} from 'react';
import Navbar from '../Navbar';
import "./Dashboard.css"
import Overview from "./Components/Overview";
import History from './Components/History';

const Dashboard = () => {

  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false)
  const openIncomePopup = () => setIsIncomeOpen(true);  
  const closeIncomePopup = () => setIsIncomeOpen(false);
  const openExpensePopup = () => setIsExpenseOpen(true);  
  const closeExpensePopup = () => setIsExpenseOpen(false);


  return (
    <div className='dashboard'>
      <Navbar/>
      <div className='Hellouser'>
      <h1 className='hello'>Hello, A!</h1>
      <div className='button'>
      <button className='income' onClick={openIncomePopup}>New Income</button>
      {isIncomeOpen && (
        <div className="popup-overlay" onClick={closeIncomePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Create a new <span className='s1'>income</span> transaction</h2>
            <form>
              <label>
                Description
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Amount
                <input type="number" required />
              </label>
              <br />
              <label>Category</label>
                <div className="catselect">
                  <select name="" id="">Select Categories
                    <option value=""><span className='s3'>+</span> Create New Category </option>
                  </select>
                </div>
              <label>
                Transaction Date
                <input type="date" required />
              </label>
              <button type="button" className='button2' onClick={closeIncomePopup}>
                Close
              </button>
              <button type="submit" className='button1'>Submit</button>
            </form>
          </div>
        </div>
      )}
      <button className='expense' onClick={openExpensePopup}>New Expense</button>
      {isExpenseOpen && (
        <div className="popup-overlay" onClick={closeExpensePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Create a new <span className='s2'>expense</span> transaction</h2>
            <form>
              <label>
                Description
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Amount
                <input type="number" required />
              </label>
              <br />
              <label>Category</label>
                <div className="catselect">
                  <select name="" id="">Select Categories
                    <option value=""><span className='s3'>+</span> Create New Category </option>
                  </select>
                </div>
              <label>
                Transaction Date
                <input type="date" required />
              </label>
              <button className="button2" type="button" onClick={closeExpensePopup}>
                Close
              </button>
              <button type="submit" className='button1'>Submit</button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>  
      <Overview/>
      <History/>
    </div>
  )
}

export default Dashboard;
