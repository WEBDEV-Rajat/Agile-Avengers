import React, { useState } from "react";
import { Link } from "react-router-dom";
import {RxCross2, RxHamburgerMenu} from "react-icons/rx"

const Navbar = () => {
  const [Navbar, setNavbar] = useState(false);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  

  const toggleNavbar = () => {
    setNavbar(!Navbar);
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="fixed top-0 z-50 w-full h-20 flex flex-row bg-green-300 shadow-md">
        <div className="w-full">
          <nav className=" w-full h-20 flex flex-row justify-around items-center font-semibold max-[768px]:justify-between">
            <h1 className="text-orange-500 text-2xl p-5">
            <Link  to="/">ExpenseGuru</Link>
            </h1>
            <div className="w-full h-20 flex flex-row justify-around items-center font-semibold max-[768px]:hidden">
            <h1>
              <Link to="#features" className="p-3 rounded-lg hover:bg-[#fcfbfa]">Features</Link>
            </h1>
            <h1>
              <Link to="#testimonials" className="p-3 rounded-lg hover:bg-[#fcfbfa]">Testimonials</Link>
            </h1>
            <h1>
              <Link to="/about-us" className="p-3 rounded-lg hover:bg-[#fcfbfa] ">About Us</Link>
            </h1>
            <h1 >
              <Link to="#contact-us" className="p-3 rounded-lg hover:bg-[#fcfbfa] ">Contact Us</Link>
            </h1>
            <h1>
                <div className="p-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  <Link to="/login" className="">Sign In </Link>
                  <span>/</span>
                  <Link to="/register" className=""> Sign Up</Link>
                </div>
            </h1>
            
            </div>
            {Navbar && (
              <div className="md:hidden transition-all bg-slate-100 absolute top-[70px] right-5 rounded-lg p-2">
              <ul className="flex flex-col gap-5 ml-2 p-2">
                <Link to="/features" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Features</Link>
                <Link to="/testimonials" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Testimonials</Link>
                <Link to="/about" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">About Us</Link>
                <Link to="/contact" className="border border-b-black p-1 bg-slate-200 hover:bg-slate-400 rounded-lg text-lg">Contact Us</Link>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md text-lg">Sign In / Sign Up</Link>
              </ul>
              </div>
            )}
            {isNavbarOpen ? (
              <>
               <RxCross2 size={25} className="mr" onClick={toggleNavbar}/>
              </>
            ) : 
            (<>
            <RxHamburgerMenu size={25} className="hidden max-[768px]:block transition-all mr-5" onClick={toggleNavbar}/>
            </>)}
          </nav>
        </div>
      </div>
  );
};

export default Navbar;
