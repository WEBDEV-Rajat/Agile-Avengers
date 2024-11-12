import React, {useState} from 'react'
import Navbar from '../Navigationbar';
import "./Manage.css"
import BudgetPlan from '../BudgetPlan/BudgetPlan';
import { Link } from 'react-router-dom';

const Manage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const openCategoryPopup = () => setIsCategoryOpen(true);
  const closeCategoryPopup = () => setIsCategoryOpen(false);
  return (
    <div>
      <Navbar/>
      <div className='cat'>
        <div className=" new recurring-transactions">
       <h1>Create Recurring Transactions</h1>
       <p>Set up automated recurring transactions to streamline financial processes and ensure consistent, timely payments.</p>
       <a href="/recurring-transactions">Recurring Transaction</a>
        </div>
        <div className=" new Budget-Plan">
       <h1>Create Budget Plan</h1>
       <p>Develop a comprehensive budget plan that allocates resources effectively, prioritizes essential expenses, and incorporates contingencies to ensure financial stability and support long-term goals.</p>
       <a href="/budget-plan">Budget Plan</a>
        </div>
      < div className=" new savings">
       <h1>Savings</h1>
       <p>Implement a structured savings plan that allocates a portion of income toward financial goals, ensuring disciplined contributions to build long-term financial security.</p>
       <a href="/savings">Savings</a>
        </div>

      <div className='inc-cat'>
        <div className='manage-cats'>
        <h1>Manage Income Categories</h1>
        <button type="button" onClick={openCategoryPopup} className="category-btn">
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
        <div className="cats"></div>
      </div>
      <div className="exp-cat">
      <div className='manage-cats'>
        <h1>Manage Expense Categories</h1>
        <button type="button" onClick={openCategoryPopup} className="category-btn">
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
        <div className="cats"></div>
      </div>
      </div>
    </div>
  )
}

export default Manage;
