import React, { useState } from 'react';
import Navigationbar from '../Navigationbar';
import './Dashboard.css';
import Overview from './Components/Overview';
import History from './Components/History';

const Dashboard = () => {
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const openIncomePopup = () => setIsIncomeOpen(true);
  const closeIncomePopup = () => setIsIncomeOpen(false);
  const openExpensePopup = () => setIsExpenseOpen(true);
  const closeExpensePopup = () => setIsExpenseOpen(false);
  const openCategoryPopup = () => setIsCategoryOpen(true);
  const closeCategoryPopup = () => setIsCategoryOpen(false);

  return (
    <div className='dashboard'>
      <Navigationbar />
      <div className='Hellouser'>
        <h1 className='hello'>Hello, A!</h1>
        <div className='buttons'>
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
                    <select name="category" id="category-select">
                      <option value="">Select Category</option>
                    </select>
                    <button type="button" onClick={openCategoryPopup} className="create-category-btn">
                      + Create New Category
                    </button>
                    {isCategoryOpen && (
                      <div className="popup-overlay" onClick={closeCategoryPopup}>
                        <div className="popup" onClick={(e) => e.stopPropagation()}>
                          <h2>Create New Category</h2>
                          <form>
                          <label>
                           Type
                         <select>
                         <option value="">Income</option>
                         <option value="">Expense</option>
                         </select>
                         </label>
                            <label>
                              Category Name
                              <input type="text" required />
                            </label>
                            <label>
                              Icon
                              <input type="text" required />
                            </label>
                            <button type="button" className='button2' onClick={closeCategoryPopup}>Close</button>
                            <button type="submit" className='button1'>Submit</button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                  <label>
                    Transaction Date
                    <input type="date" required />
                  </label>
                  <button type="button" className='button2' onClick={closeIncomePopup}>Close</button>
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
                    <select name="category" id="category-select">
                      <option value="">Select Category</option>
                    </select>
                    <button type="button" onClick={openCategoryPopup} className="create-category-btn">
                      + Create New Category
                    </button>
                    {isCategoryOpen && (
                      <div className="popup-overlay" onClick={closeCategoryPopup}>
                        <div className="popup" onClick={(e) => e.stopPropagation()}>
                          <h2>Create New Category</h2>
                          <form>
                          <label>
                           Type
                         <select>
                         <option value="">Income</option>
                         <option value="">Expense</option>
                         </select>
                         </label>
                            <label>
                              Category Name
                              <input type="text" required />
                            </label>
                            <label>
                              Icon
                              <input type="text" required />
                            </label>
                            <button type="button" className='button2' onClick={closeCategoryPopup}>Close</button>
                            <button type="submit" className='button1'>Submit</button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                  <label>
                    Transaction Date
                    <input type="date" required />
                  </label>
                  <button className="button2" type="button" onClick={closeExpensePopup}>Close</button>
                  <button type="submit" className='button1'>Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Overview />
      <History />
    </div>
  );
}

export default Dashboard;
