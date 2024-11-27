import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { IoMdInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const apiURL = `${import.meta.env.VITE_API_URL}/users/verify-email`;

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Allow only the last digit
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = otp.join("");
    try {
      const response = await axios.post(apiURL, { email, token });
      setLoading(false);
      toast.success(response.data.message);
      navigate("/login");

      Swal.fire({
        title: "Success!",
        text: "Your email has been verified successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Verification failed";
      setLoading(false);
      toast.error(errorMessage);

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="sign-up-bg w-full h-screen bg-cover bg-top relative flex items-center justify-center">
      {/* Overlay */}
      <div className="bg-[#173146] w-full h-full opacity-50 absolute top-0 left-0"></div>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-white text-center">
          Verify Email
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md bg-opacity-80 rounded-lg p-6 mt-8 shadow-lg py-10"
        >
          {/* Email Input */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-100 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300"
              required
            />
          </div>

          {/* OTP Input */}
          <div className="mb-6 relative">
            <label className="block mb-2 text-gray-100 font-medium">
              OTP (One-Time Password)
            </label>
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  maxLength="1"
                  className="w-10 h-10 md:w-12 md:h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white placeholder:text-gray-300"
                />
              ))}
            </div>
            <div
              className="absolute right-0 top-0 mt-1 text-gray-300 cursor-pointer"
              title="The OTP has been sent to your email."
              onClick={() => setShowPopup(!showPopup)}
            >
              <IoMdInformationCircle />
            </div>
            {showPopup && (
              <div className="absolute top-8 right-0 bg-white p-3 rounded-lg shadow-lg text-gray-800 w-64">
                <p className="text-sm">
                  The OTP has been sent to your email. Please check your inbox
                  or spam folder.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-2 text-blue-500 hover:underline text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 mb-4"
          >
            {loading ? "Loading..." : "Verify Email"}
          </button>

          {/* Skip Button */}
          <div className="flex justify-end items-center mt-4">
            <button
              type="button"
              className="h-10 bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 rounded-lg"
              onClick={() => (window.location.href = "/")}
            >
              Skip
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-sm text-center text-white">
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
};

export default VerifyEmail;
