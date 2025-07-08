import React from "react";
import img from "../Assets/img1.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Small Business Owner",
      feedback: "ExpenseGuru helped me organize my finances like never before. Highly recommended!",
      image: img,
    },
    {
      name: "John Smith",
      role: "Freelancer",
      feedback: "This website made managing my invoices and expenses so easy. A lifesaver!",
      image: img,
    },
    {
      name: "Emily Brown",
      role: "Entrepreneur",
      feedback: "Tracking my financial goals has never been smoother. Kudos to the team!",
      image: img,
    },
  ];

  return (
    
    <section className="bg-white py-12 scroll-mt-24" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0D5B19] mb-12">
          What Our Users Say
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-6 rounded-lg border border-gray-200"
            >
              <div className="relative -mt-16">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} photo`}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="text-center mt-6">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.feedback}"
                </p>
                <h4 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
