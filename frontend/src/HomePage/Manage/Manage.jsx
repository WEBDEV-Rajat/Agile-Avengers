import React, {useState} from 'react'
import Navbar from '../Navigationbar';
import "./Manage.css"
import { Link } from 'react-router-dom';

const Manage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const openCategoryPopup = () => setIsCategoryOpen(true);
  const closeCategoryPopup = () => setIsCategoryOpen(false);
  return (
    <div>
      <Navbar/>
      <div className='relative top-20 w-full h-auto'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full h-auto gap-10 p-[60px] z-10'>
        <Link to="/recurring-transactions" className="bg-gray-100 flex flex-col items-center justify-center rounded-lg text-center border border-gray-500 hover:bg-gray-200">
       <h1 className='text-xl font-semibold text-green-700'>Create Recurring Transactions</h1>
       <p className='text-green-700'>Set up automated recurring transactions to streamline financial processes and ensure consistent, timely payments.</p>
       <a href="/recurring-transactions" className='text-white bg-green-700 p-2 rounded-lg mt-5'>View Pending Transactions</a>
        </Link>
        <Link to="/budget-plan" className="bg-gray-100 flex flex-col items-center justify-center rounded-lg text-center border border-gray-500 hover:bg-gray-200 pb-5 pt-5">
       <h1 className='text-xl font-semibold text-green-700'>Create Budget Plan</h1>
       <p className='text-green-700'>Develop a comprehensive budget plan that allocates resources effectively, prioritizes essential expenses, and incorporates contingencies to ensure financial stability and support long-term goals.</p>
       <a href="/budget-plan" className='text-white bg-green-700 p-2 rounded-lg mt-5'>View Budget Plans</a>
        </Link>
      <Link to="/savings" className="bg-gray-100 flex flex-col items-center justify-center rounded-lg text-center border border-gray-500 hover:bg-gray-200">
       <h1 className='text-xl font-semibold text-green-700'>Create Savings Plan</h1>
       <p className='text-green-700'>Implement a structured savings plan that allocates a portion of income toward financial goals, ensuring disciplined contributions to build long-term financial security.</p>
       <a href="/savings" className='text-white bg-green-700 p-2 rounded-lg mt-5'>View Saving Plans</a>
        </Link>
      <Link to="/income-categories" className="bg-gray-100 flex flex-col items-center justify-center rounded-lg text-center border border-gray-500 hover:bg-gray-200 pt-5 pb-5">
       <h1 className='text-xl font-semibold text-green-700'>Manage Income Categories</h1>
       <p className='text-green-700'>Organize income sources into defined categories to streamline financial tracking and enable more accurate budgeting and reporting.</p>
       <a href="/income-categories" className='text-white bg-green-700 p-2 rounded-lg mt-5'>View Income Categories</a>
        </Link>
      <Link to="/expense-categories" className="bg-gray-100 flex flex-col items-center justify-center rounded-lg text-center border border-gray-500 hover:bg-gray-200">
       <h1 className='text-xl font-semibold text-green-700'>Manage Expense Categories</h1>
       <p className='text-green-700'>Effectively managing expense categories enables precise tracking of financial allocations, facilitating better budgeting and insightful spending analysis.</p>
       <a href="/expense-categories" className='text-white bg-green-700 p-2 rounded-lg mt-5'>View Expense Categories</a>
        </Link>
        </div>
      </div>
      </div>
  )
}

export default Manage;
