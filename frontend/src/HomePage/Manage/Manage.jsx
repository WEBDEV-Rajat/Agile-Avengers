import React, {useState} from 'react'
import Navbar from '../Navigationbar';
import "./Manage.css"

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
      <div className=" new savings">
       <h1>Create Savings Plan</h1>
       <p>Implement a structured savings plan that allocates a portion of income toward financial goals, ensuring disciplined contributions to build long-term financial security.</p>
       <a href="/savings">Savings</a>
        </div>
      <div className=" new income-cats">
       <h1>Manage Income Categories</h1>
       <p>Organize income sources into defined categories to streamline financial tracking and enable more accurate budgeting and reporting.</p>
       <a href="/income-categories">Income Categories</a>
        </div>
      <div className=" new expense-cats">
       <h1>Manage Expense Categories</h1>
       <p>Effectively managing expense categories enables precise tracking of financial allocations, facilitating better budgeting and insightful spending analysis.</p>
       <a href="/expense-categories">Expense Categories</a>
        </div>
      </div>
      </div>
  )
}

export default Manage;
