import React from 'react'
import Navbar from '../Navigationbar';
import "./Manage.css"

const Manage = () => {
  return (
    <div>
      <Navbar/>
      <div className='cat'>
      <div className='inc-cat'>
        <div className='manage-cats'>
        <h1>Manage Income Categories</h1>
        <button>+ Create New Category</button>
        </div>
        <div className="cats"></div>
      </div>
      <div className="exp-cat">
      <div className='manage-cats'>
        <h1>Manage Expense Categories</h1>
        <button>+ Create New Category</button>
        </div>
        <div className="cats"></div>
      </div>
      </div>
    </div>
  )
}

export default Manage;
