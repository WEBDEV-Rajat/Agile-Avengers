// Testimonials.jsx
import React from 'react';
import img from "../Assets/img1.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Small Business Owner",
      feedback: "ExpenseGuru helped me organize my finances like never before. Highly recommended!",
      image: {img},
    },
    {
      name: "John Smith",
      role: "Freelancer",
      feedback: "This website made managing my invoices and expenses so easy. A lifesaver!",
      image: {img},
    },
    {
      name: "Emily Brown",
      role: "Entrepreneur",
      feedback: "Tracking my financial goals has never been smoother. Kudos to the team!",
      image: {img},
    },
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto" >
        <h2 className="text-3xl font-bold text-center text-[#0D5B19] mb-8">What Our Users Say</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 m-10 pb-10 border-b">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className=" bg-blue-400 mt-5 flex items-center justify-center flex-col p-6 rounded-lg shadow-lg border-gray-200"
              >
              <div className='bg-white flex flex-col items-center text-center pt-3 pb-5 rounded-lg'>
              
              <div className="-translate-y-8">
                <img src={img} alt="User" className="w-20 h-20 rounded-full" />
              </div>
              <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              <div className=''>
              
              <h4 className="mt-4 font-bold text-center text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-center text-gray-500">{testimonial.role}</p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
