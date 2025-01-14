import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUserErrors,
  login,
  forgotPassword,
} from "../redux/Slices/user.slices.js";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { WiDirectionLeft } from "react-icons/wi";
import Footer from "../Landingpage/Components/Footer.jsx"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

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
    <Link to="/" className="absolute p-2 flex bg-black text-white mt-4 ml-4">
    <WiDirectionLeft size={25} />
    <p className="font-semibold">Back To Home Page</p>
    </Link>
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-semibold text-blue-600">Welcome Back!</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center border border-blue-300 rounded-md">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border border-blue-300 rounded-md">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
                />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition duration-300 ${
              loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-600">Or</span>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGoogleLoginSuccess}
              className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-green-100 transition duration-300"
              >
              <FcGoogle className="mr-2 text-xl" />
              Login with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline"
              >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to={"/register"} className="text-white bg-green-600 p-2 rounded-md hover:bg-green-700">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default Login;

