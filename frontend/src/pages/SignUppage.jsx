import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register  } from "../redux/Slices/user.slices.js";
import { toast } from "react-toastify";
// import { FaPencilAlt } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";

const SignUppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("name: " + name);
    console.log("email: " + email);
    console.log("password: " + password);
    console.log("fullname:"+fullName);
    
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("password", password);
    console.log("dsjhvhjcd :",formData);
    
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Registered successfully");
      navigateTo("/");
    }
  }, [dispatch, error, isAuthenticated, navigateTo]);

  return (
    <>
      <section className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold">Create a new account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 p-2 focus:outline-none"
                />
                
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-2 focus:outline-none"
                />
               
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 p-2 focus:outline-none"
                />
                
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex-1 p-2 focus:outline-none"
                />
                
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
            <div className="mt-4 text-center">
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUppage;
