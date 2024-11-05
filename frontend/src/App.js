import "./App.css";

import SignUppage from "./pages/SignUppage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Landingpage/LandingPage";
import Login from "./pages/Login";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FilenotFound from "./pages/FilenotFound";
import Testimonials from "./pages/Testimonials";
import "react-toastify/dist/ReactToastify.css";
import ForgotPass from "./pages/ForgotPass";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignUppage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/*" element={<FilenotFound />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default App;
