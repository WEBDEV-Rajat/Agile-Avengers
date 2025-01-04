import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { logout } from "../redux/Slices/user.slices";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { EllipsisVertical } from 'lucide-react';

const Navigationbar = () => {
  const [Navbar, setNavbar] = useState(false);
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setNavbar(!Navbar);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  return (
    <div className='fixed flex flex-row w-full h-20 backdrop-blur-[100px] bg-[#FAF9F6] z-50 md:justify-around max-[768px]:justify-between '>
      <h1 className='text-2xl font-semibold flex items-center ml-10 text-orange-500'>ExpenseGuru</h1>
     <div className=' hidden md:flex flex-row justify-evenly w-full text-green-700 font-semibold items-center text-lg'>
        <Link className='pt-5 pb-5 hover:border-b-2 hover:border-green-700' to="/dashboard">Dashboard</Link>
        <Link className='pt-5 pb-5 hover:border-b-2 hover:border-green-700' to="/analysis">Analysis</Link>
        <Link className='pt-5 pb-5 hover:border-b-2 hover:border-green-700' to="/manage">Manage</Link>
        <Link className='pt-5 pb-5 hover:border-b-2 hover:border-green-700' to="/notifications">Notifications</Link>
      </div>
      <div className='hidden md:flex items-center mr-10'>
        <Link to="/" className='text-green-700 font-semibold text-xl pt-5 pb-5 hover:border-b-2 hover:border-green-700' onClick={handleLogout}>Logout</Link>
        
      </div>
      {Navbar && (
              <div className="md:hidden transition-all bg-slate-100 absolute top-[70px] right-5 rounded-lg p-2">
              <ul className="flex flex-col gap-5 ml-2 p-2">
                <Link to="/dashboard" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Dashboard</Link>
                <Link to="/analysis" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Analysis</Link>
                <Link to="/manage" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Manage</Link>
                <Link to="/notifications" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Notifications</Link>
                <Link to="/" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md text-lg" onClick={handleLogout}>Logout</Link>
              </ul>
              </div>
            )}
            <EllipsisVertical className="hidden max-[768px]:block relative top-7 mr-5 transition-all" onClick={toggleNavbar}/>
    </div>
  )
}

export default Navigationbar;