import React from "react";
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";
import { logout} from "../../redux/Slices/user.slices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  return (
    <div className="navbar">
      <div class="container">
        <div class="glass">
          <nav>
            <h1>
              <Link to={"/"}>ExpenseGuru</Link>
            </h1>
            <h1>
              <Link to={"/features"}>Features</Link>
            </h1>
            <h1>
              <Link to={"/testimonials"}>Testimonials</Link>
            </h1>
            <h1>
              <Link to={"/about-us"}>About Us</Link>
            </h1>
            <h1>
              <Link to={"/contact-us"}>Contact Us</Link>
            </h1>
            <h1>{
              (isAuthenticated)?<button onClick={handleLogout}>logout</button>
              :<Link to={"/login"}>Login</Link>
              }
              
            </h1>
            <h1>
              <Link to={"/register"}>Get Started</Link>
            </h1>

            {/* <h1>Get Started</h1> */}
            {/* <Link to = */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
