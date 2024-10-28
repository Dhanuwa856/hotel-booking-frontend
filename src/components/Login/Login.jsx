import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for signup page navigation
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission

    axios
      .post(import.meta.env.VITE_API_URL + "/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setErrorMessage(""); // Clear error message on successful login
        // Save token and redirect user (if needed)
        localStorage.setItem("userToken", res.data.token);
        // Optionally redirect to home or admin page based on user role
        window.location.href = res.data.type === "admin" ? "/admin" : "/";
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid email or password. Please try again."); // Set error message
      });
  }

  return (
    <div className="login-bg w-full h-screen bg-cover bg-top flex justify-center items-center relative">
      <div className="bg-[#469ad6] w-full h-full opacity-[30%] absolute top-0 left-0"></div>
      <div className="w-full max-w-sm bg-white/20 backdrop-blur-md rounded-lg flex flex-col items-center shadow-lg py-20">
        <h1 className="text-3xl p-4 text-white font-bold text-center">Login</h1>

        <form
          className="w-full flex flex-col items-center space-y-5"
          onSubmit={handleLogin}
        >
          <input
            autoFocus
            required
            type="text"
            placeholder="Enter your email address"
            className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Enter your password"
            className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage}
              <br />
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-blue-400">
                Sign up here
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="w-[80%] h-[40px] bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
