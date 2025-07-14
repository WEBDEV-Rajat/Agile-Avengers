import React, { useState } from "react";
import img from "../Assets/contact.png";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/contact/us", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);

      toast.success(response.data.message);
      setFormData({ name: "", email: "", message: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <section className="bg-white pb-8" id="contact-us">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0D5B19] mb-8">Get in Touch</h2>
        <form
          className="max-w-[900px] mx-auto bg-slate-100 p-6 rounded-lg shadow-lg border"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-5 max-[800px]:flex-col">
            <div className="mt-5">
              <img
                src={img}
                alt="Contact"
                className="lg:w-[400px] lg:h-[400px] md:w-[340px] md:h-[340px] max-[600px]:w-[200px] max-[600px]:h-[200px]"
              />
            </div>

            <div className="w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border bg-slate-50 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full bg-slate-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border bg-slate-50 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
