import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUserErrors,
  login,
} from "../redux/Slices/user.slices.js";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { WiDirectionLeft } from "react-icons/wi";
import Footer from "../Landingpage/Components/Footer.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  const handleGoogleLoginSuccess = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Logged in successfully");
      navigateTo("/dashboard");
    }
  }, [dispatch, error, isAuthenticated, navigateTo]);

  return (
    <div>
      <Link to="/" className="absolute p-2 flex bg-black text-white mt-4 ml-4 rounded items-center">
        <WiDirectionLeft size={20} />
        <p className="font-medium text-sm md:text-base ml-1">Back To Home</p>
      </Link>

      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-blue-600">
              Welcome Back!
            </h3>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-sm md:text-base">
            <div>
              <label className="block text-blue-600 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-blue-300 rounded-md p-2 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-blue-600 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-blue-300 rounded-md p-2 focus:outline-none"
                required
              />
              <div className="mt-1 text-right">
                <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white text-sm md:text-base ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <div className="flex items-center justify-center my-3">
              <span className="text-gray-500">OR</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLoginSuccess}
              className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-green-100 transition text-sm md:text-base"
            >
              <FcGoogle className="mr-2 text-xl" />
              Login with Google
            </button>

            <div className="text-center mt-4 text-sm md:text-base">
              <span className="text-gray-600">Don't have an account?</span>
              <Link
                to="/register"
                className="ml-2 text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
