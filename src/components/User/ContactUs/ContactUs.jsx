import React from "react";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import FAQ from "../Faq/Faq";

const ContactUs = () => {
  return (
    <>
      <NavBar />
      <div className="category-bg w-full h-[125px] bg-cover bg-center relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[50%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.2rem] capitalize">
          Contact Us
        </h1>
      </div>
      <div className="p-6 bg-gray-100">
        {/* Top Section - Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Email Card */}
          <div className="bg-white shadow-md p-3 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">info@example.com</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
              Send Email
            </button>
          </div>
          {/* Phone Card */}
          <div className="bg-white shadow-md p-3 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">+012 345 67890</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
              Call Now
            </button>
          </div>
          {/* Location Card */}
          <div className="bg-white shadow-md p-3 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Our Location</h3>
            <p className="text-gray-600 mb-4">
              123 Street, Hanguranketha, Kandy
            </p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm">
              View on Map
            </button>
          </div>
        </div>

        {/* Bottom Section - Map and Form */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="flex-1">
            <iframe
              className="w-full md:h-[500px] h-80 rounded-lg shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.95373531531017!3d-37.81627974202139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43a1fdfd4b%3A0x5045675218ce7e0!2s123%20Main%20Street!5e0!3m2!1sen!2s!4v1632838406324!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          {/* Contact Form */}
          <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Email Us Your Questions
            </h3>
            <form>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {/* Message Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FF6F61] hover:bg-[#FF5E54] text-white py-2 px-4 rounded-md "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />
    </>
  );
};

export default ContactUs;
