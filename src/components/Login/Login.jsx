import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for signup page navigation
import "./Login.css";
import axios from "axios";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // import icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL + "/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setErrorMessage(""); // Clear error message on successful login
        setLoading(false);
        // Save token and redirect user (if needed)
        localStorage.setItem("userToken", res.data.token);
        // Optionally redirect to home or admin page based on user role
        if (res.data.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
          // pass;
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid email or password. Please try again."); // Set error message
        setLoading(false);
      });
  }

  return (
    <div className="login-bg w-full h-screen bg-cover bg-top relative z-0">
      <div className="bg-[#0f2f46] w-full h-full opacity-[30%] absolute top-0 left-0 -z-[1]"></div>
      <div className="mx-auto px-40 pt-5">
        <Link to="/" className="flex items-center gap-2  ">
          <img
            src="https://placehold.co/50x50"
            alt="Hotel Logo"
            className="w-[50px] h-[50px] cursor-pointer rounded-full"
          />
          <h3 className="text-white capitalize text-xl font-bold hover:text-[#E3F2FD] transition-colors">
            Hotel Name
          </h3>
        </Link>
        <div className="w-full mx-auto flex justify-center mt-10">
          <img
            src="/login.png"
            alt="login icon"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        </div>
        <div className="mt-8 text-right text-sm text-white/70 font-medium fixed right-5 bottom-3">
          © 2024 Designed and Developed by{" "}
          <a
            href="https://github.com/Dhanuwa856"
            target="_blank"
            className="text-white"
          >
            DHANUwa
          </a>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-[45%] mx-auto flex flex-col items-center gap-5"
        >
          <div className="relative w-[70%] mt-10">
            <AiOutlineMail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              autoFocus
              required
              type="email"
              placeholder="Enter your email address"
              className="w-full h-[50px] bg-[#aaa]/70 text-white/80 placeholder-white px-12 outline-none rounded-[70px] transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative w-[70%]">
            <AiOutlineLock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="w-full h-[50px] bg-[#aaa]/70 text-white/80 placeholder-white px-12 outline-none rounded-[70px] transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-[70%] h-[50px] mt-4 bg-blue-500 hover:bg-blue-600 outline-none text-white font-semibold rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 uppercase"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <div className="flex justify-between w-[70%] mt-1 text-sm text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 border-white/70 rounded focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-white/70 font-medium">
                Keep me logged in
              </span>
            </label>
            <a href="" className="text-blue-500 hover:underline font-medium">
              Forgot Password?
            </a>
          </div>
          <div className="flex justify-between w-[70%] text-sm text-gray-600">
            <Link
              to="/signup"
              className="text-white hover:underline font-medium"
            >
              Create Account
            </Link>
            <a href="" className="text-white/80 hover:underline font-medium">
              Need Help?
            </a>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-center mb-2 bg-white/60 w-[70%] py-1">
              {errorMessage}
              <br />
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-blue-500">
                Sign up here
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
