import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import uploadMedia from "../../Utils/mediaUpload";
import "./SignUp.css";
import toast from "react-hot-toast";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUserPostUrl = import.meta.env.VITE_API_URL + "/users/";

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    if (password !== rePassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadMedia(image);
      await axios.post(apiUserPostUrl, {
        email,
        password,
        image: imageUrl,
        firstName,
        lastName,
        whatsApp: whatsappNumber,
        phone: phoneNumber,
      });
      toast.success(
        "OTP has been sent to your email. Please check your inbox."
      );
      navigate("/email-verify");
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message?.includes("duplicate key")) {
        setErrorMessage(
          "An account with this email already exists. Please log in."
        );
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="sign-up-bg w-full h-full bg-cover bg-top relative z-0 flex items-center justify-center">
      <div className="bg-[#173146] w-full h-full opacity-50 absolute top-0 left-0 -z-10"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <img
            src="/user-account.png"
            alt="signup icon"
            className="w-32 h-32 text-gray-200"
          />
        </div>
        <form
          onSubmit={handleSignUp}
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md bg-opacity-80 rounded-lg p-6 mt-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Create an Account
          </h2>

          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <AiOutlineUser
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="First Name"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="relative">
              <AiOutlineUser
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300 "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <AiOutlineMail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
              size={24}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <BsPhone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="Phone Number"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300 "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="relative">
              <BsPhone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="WhatsApp Number"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300 "
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <AiOutlineLock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white  placeholder:text-gray-300 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative">
              <AiOutlineLock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"
                size={24}
              />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full h-12 pl-12 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent placeholder:text-gray-300"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-200">
              Upload Your Profile Image
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full h-12 pl-3 pr-4 border rounded-xl file:bg-blue-100 file:border-none file:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 text-center mb-4">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-gray-200">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Log in
            </Link>
          </p>
        </form>
        <footer className="mt-6 text-sm text-center text-white/70">
          &copy; 2024 Designed by{" "}
          <a
            href="https://github.com/Dhanuwa856"
            target="_blank"
            className="underline text-white"
            rel="noopener noreferrer"
          >
            DHANUwa
          </a>
        </footer>
      </div>
    </div>
  );
}

export default SignUp;
