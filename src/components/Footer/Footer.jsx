import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

function Footer() {
  return (
    <>
      <footer className="w-full mt-20 bg-gray-800 p-6 md:px-12 md:pt-10">
        <div className="md:flex md:justify-between gap-10 md:items-start">
          {/* Get In Touch Section */}
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h2 className="text-xl capitalize font-semibold text-white mb-4">
              Get In Touch
            </h2>
            <ul className="text-gray-400 text-sm flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <FaLocationDot /> 123 Street, Hanguranketha, Kandy
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> +012 345 67890
              </li>
              <li className="flex items-center gap-2">
                <MdEmail /> info@example.com
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
                <FaFacebookF />
              </span>
              <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
                <FaYoutube />
              </span>
              <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
                <FaLinkedinIn />
              </span>
              <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
                <FaXTwitter />
              </span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h2 className="text-xl capitalize font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="text-gray-400 text-sm capitalize font-semibold flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <IoMdArrowDropright />
                <Link to={"/"} className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IoMdArrowDropright />
                <Link to={"/"} className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IoMdArrowDropright />
                <Link to={"/rooms"} className="hover:text-white transition">
                  Rooms
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IoMdArrowDropright />
                <Link to={"/"} className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <IoMdArrowDropright />
                <Link to={"/"} className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-xl capitalize font-semibold text-white mb-4">
              About Us
            </h2>
            <Link to="/">
              <img
                src="https://placehold.co/60x60"
                alt="Hotel Logo"
                className="w-[60px] h-[60px] cursor-pointer"
              />
            </Link>
            <p className="text-gray-400 text-sm text-justify capitalize font-medium mt-2">
              At [Hotel Name], we strive to provide exceptional hospitality,
              comfort, and luxury to every guest. From cozy rooms to world-class
              amenities, we ensure a memorable stay tailored to your needs.
              Experience the perfect blend of warmth and elegance with us!
            </p>
          </div>
        </div>

        <hr className="w-full mx-auto !bg-gray-400 mt-4 h-[0.5px]" />

        <div className="w-full mx-auto flex flex-wrap justify-between text-gray-400 text-sm mt-2 pb-1">
          <p className="text-center md:text-left  md:flex items-center gap-1">
            © Hotel Name, All Rights Reserved. Designed By
            <a href="https://github.com/Dhanuwa856">
              <span className="hover:underline cursor-pointer text-white">
                Dhanushka Rathnayaka
              </span>
            </a>
            .
          </p>
          <div className="md:flex gap-7 hidden ">
            <span className="cursor-pointer hover:text-white transition">
              Home
            </span>
            <span className="cursor-pointer hover:text-white transition">
              Cookies
            </span>
            <span className="cursor-pointer hover:text-white transition">
              Help
            </span>
            <span className="cursor-pointer hover:text-white transition">
              FAQs
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
