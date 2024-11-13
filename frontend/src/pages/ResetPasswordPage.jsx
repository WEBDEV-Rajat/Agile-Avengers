import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/Slices/user.slices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams(); 
  const { loading, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const formData = { password: newPassword, token }; 
    dispatch(resetPassword(formData)); 
  };

  useEffect(() => {
    if (loading) {
      toast.success("Password reset successfully");
      navigate("/login"); 
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, loading, navigate]);

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};
