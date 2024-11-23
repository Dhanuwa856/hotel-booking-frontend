import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Import icons
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL + "/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setErrorMessage(""); // Clear error message on successful login
        setLoading(false);
        // Save token and redirect user
        localStorage.setItem("userToken", res.data.token);
        if (res.data.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid email or password. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className="w-full login-bg bg-no-repeat bg-cover bg-top h-screen flex items-center justify-center relative z-0">
      <div className="absolute inset-0 bg-black opacity-20 z-[-1]"></div>

      <div className="w-[90%] md:w-[70%] lg:w-[30%] bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-5">
          <img
            src="https://placehold.co/100x100"
            alt="Logo"
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>

        <h2 className="text-white text-center text-2xl font-bold mb-6">
          Login to Your Account
        </h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4"
        >
          {/* Email Input */}
          <div className="relative w-full">
            <AiOutlineMail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-12 py-3 bg-transparent text-white rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none border border-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <AiOutlineLock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-12 py-3 bg-transparent text-white rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none border border-white/40 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="w-full bg-red-100 text-red-600 text-center py-2 px-4 rounded mt-3">
              {errorMessage}
            </div>
          )}

          {/* Links */}
          <div className="w-full flex justify-between items-center mt-3 text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              Keep me logged in
            </label>
            <Link to="/forgot-password" className="hover:text-white transition">
              Forgot Password?
            </Link>
          </div>

          <div className="w-full flex justify-center gap-4 mt-4 text-sm">
            <Link
              to="/signup"
              className="text-white underline hover:text-blue-400 transition"
            >
              Create Account
            </Link>
            <a
              href="#"
              className="text-white underline hover:text-blue-400 transition"
            >
              Need Help?
            </a>
          </div>
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

export default Login;
