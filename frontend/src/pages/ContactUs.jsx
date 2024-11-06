import React from 'react';
<<<<<<< HEAD

=======
>>>>>>> d89e5f9ed0ec77a86550bd53283d074934e0cb55

function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-8">Contact Us</h1>
<<<<<<< HEAD
       
        <p className="text-lg text-gray-700 text-center mb-8">
          Have questions or feedback? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
        </p>
       
=======
        
        <p className="text-lg text-gray-700 text-center mb-8">
          Have questions or feedback? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
        </p>
        
>>>>>>> d89e5f9ed0ec77a86550bd53283d074934e0cb55
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
<<<<<<< HEAD
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
              required
            />
          </div>
         
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
         
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Subject"
              required
            />
          </div>
         
          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
         
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
=======
            <input 
              type="text" 
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Your Name" 
              required 
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="you@example.com" 
              required 
            />
          </div>
          
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input 
              type="text" 
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Subject" 
              required 
            />
          </div>
          
          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
              rows="5" 
              placeholder="Write your message here..." 
              required 
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit" 
>>>>>>> d89e5f9ed0ec77a86550bd53283d074934e0cb55
              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD

=======
>>>>>>> d89e5f9ed0ec77a86550bd53283d074934e0cb55
export default ContactUs;
