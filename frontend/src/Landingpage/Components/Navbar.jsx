import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/Slices/user.slices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  return (
    <div>
      <div className="container">
        <div className="glass">
          <nav>
            <h1>
              <Link to="/">ExpenseGuru</Link>
            </h1>
            <h1>
              <Link to="/features">Features</Link>
            </h1>
            <h1>
              <Link to="/testimonials">Testimonials</Link>
            </h1>
            <h1>
              <Link to="/about-us">About Us</Link>
            </h1>
            <h1>
              <Link to="/contact-us">Contact Us</Link>
            </h1>
            <h1>
              {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <div className="get-started">
                  <Link to="/login">Login</Link>
                  <span> / </span>
                  <Link to="/register">Get Started</Link>
                </div>
              )}
            </h1>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
