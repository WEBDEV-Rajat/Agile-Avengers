import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/Slices/user.slices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (email) {
      const formData = new FormData();
      formData.append("email", email);
      dispatch(forgotPassword(formData)); // Dispatch action to send forgot password request
    } else {
      toast.warning("Please enter your email address.");
    }
  };

  // Display success or error messages as toasts and handle navigation
  useEffect(() => {
    if (message) {
      toast.success(message); // Display the success message
      navigate(-1); // Navigate back after showing the success toast
    }
    if (error) {
      toast.error(error); // Display error messages
    }
  }, [message, error, navigate]); // Ensure navigate is included in the dependencies

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h3>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPass;
