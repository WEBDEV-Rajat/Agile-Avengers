import React from "react";

function Features() {
  return (
    <div className="flex flex-col items-center min-h-screen py-12 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Features</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl px-4 md:px-0">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 1</h2>
          <p className="text-gray-600">
            This is a description of the first feature. It provides value and
            helps users accomplish something efficiently.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 2</h2>
          <p className="text-gray-600">
            This feature offers another benefit, enhancing the user experience
            and adding more functionality.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 3</h2>
          <p className="text-gray-600">
            Here’s a description of a third feature, designed to make tasks
            easier and more efficient for users.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 4</h2>
          <p className="text-gray-600">
            This feature provides additional support, allowing users to explore
            new options.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 5</h2>
          <p className="text-gray-600">
            A fifth feature to enhance the overall user experience with valuable
            insights.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Feature 6</h2>
          <p className="text-gray-600">
            This final feature rounds out the set, ensuring a complete package
            for users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;

export default Features;
