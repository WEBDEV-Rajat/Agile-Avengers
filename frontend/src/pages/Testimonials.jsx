import React from 'react';

function Testimonials() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">Testimonials</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-12">
        Hear from our satisfied users and learn how our service has positively impacted their experiences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-gray-600 mb-4">
            "This service has been a game-changer for me. The ease of use and efficiency have exceeded my expectations!"
          </p>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-sm text-gray-500">CEO, Company A</p>
            </div>
          </div>
        </div>
        

        <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-gray-600 mb-4">
            "I would highly recommend this to anyone looking for reliable and top-quality service."
          </p>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-sm text-gray-500">Marketing Director, Company B</p>
            </div>
          </div>
        </div>
        

        <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-50">
          <p className="text-gray-600 mb-4">
            "Fantastic! The support and features offered are unmatched. I couldn’t be happier."
          </p>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Alex Johnson</h3>
              <p className="text-sm text-gray-500">Entrepreneur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
