import React from "react";
import img1 from "../Assets/feature-img-1-dod.png";
import img2 from "../Assets/feature-img-2-dod.png";
import img3 from "../Assets/feature-img-3-dod.webp";
import img4 from "../Assets/feature-img-4-dod.png";
import img5 from "../Assets/feature-img-5-dod.webp";
import img6 from "../Assets/feature-img-6-dod.webp";

const Features = () => {
  return (
    <div className="mt-20 mb-8" id="features">
      <h1 className="text-center text-3xl font-bold text-[#0D5B19] mb-10">
        Features
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-10">
        {[img1, img2, img3, img4, img5, img6].map((img, index) => {
          const descriptions = [
            "Record daily transactions seamlessly across multiple, customizable categories, allowing for detailed tracking and organization tailored to your unique financial needs.",
            "Generate clear, easy-to-read expense reports with powerful visualizations that provide a comprehensive view of your spending patterns.",
            "Receive timely notifications for upcoming recurring bills and transactions, ensuring you're always informed before due dates.",
            "Monitor your savings progress to achieve your financial goals with confidence.",
            "Enable detailed expense reports for seamless sharing and analysis by exporting data in multiple formats.",
            "Integrates comparative analysis tools in your expense tracker app which allows users to evaluate their current expenses against previous months or years.",
          ];

          return (
            <div
              key={index}
              className="bg-gradient-to-l from-blue-50 to-white p-4 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center max-[450px]:flex-col">
                <img
                  src={img}
                  alt={`Feature ${index + 1}`}
                  className="w-24 h-24 border border-gray-300 rounded-lg mr-4"
                />
                <p className="text-gray-700 font-semibold leading-6">
                  {descriptions[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;

