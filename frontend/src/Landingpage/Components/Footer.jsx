
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm ml-4 text-white">&copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.</p>
        <div className="flex space-x-10 mt-4 mr-4 md:mt-0">
          <a href="#" className=" text-white">Privacy Policy</a>
          <a href="#" className="text-white">Terms of Service</a>
          <a href="#" className="text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
