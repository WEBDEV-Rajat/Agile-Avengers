import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Testimonials from "./Components/Testimonials";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import AboutUs from "../pages/AboutUs";

const LandingPage = () => {
  useEffect(() => {
    document.title = "ExpenseGuru";
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
