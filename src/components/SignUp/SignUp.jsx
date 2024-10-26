import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [fristName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUserPostUrl = import.meta.env.VITE_API_URL + "/users/";

  function handleSignUp(e) {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (password !== rePassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    axios
      .post(apiUserPostUrl, {
        email: email,
        password: password,
        image: image,
        firstName: fristName,
        lastName: lastName,
        whatsApp: whatsappNumber,
        phone: phoneNumber,
      })
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        if (err.response.data.message.includes("duplicate key")) {
          setErrorMessage(
            `An account with this email already exists. Please log in `
          );
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      });
  }
  return (
    <div className="sign-up-bg w-full h-screen bg-cover bg-center flex justify-center items-center relative">
      <div className="bg-[#469ad6] w-full h-full opacity-[30%] absolute top-0 left-0"></div>
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-lg flex flex-col  shadow-lg py-12">
        <h1 className="text-3xl p-4 text-white font-bold text-center">
          Sign Up
        </h1>
        <form
          className="w-full flex flex-col items-center space-y-5"
          onSubmit={handleSignUp}
        >
          <div className="flex w-[80%] gap-2 items-center">
            <input
              autoFocus
              type="text"
              value={fristName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              placeholder="Enter your first name"
              className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              placeholder="Enter your last name"
              className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            />
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="Enter your email address"
            className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
          />
          <div className="flex w-[80%] gap-2 items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="Enter your password"
              className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            />
            <input
              type="password"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              required
              placeholder="Confirm your password"
              className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
            />
          </div>

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            required
            placeholder="Enter your phone number"
            className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
          />
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => {
              setWhatsappNumber(e.target.value);
            }}
            required
            placeholder="Enter your whatsapp number"
            className="w-[80%] bg-transparent text-white placeholder-white h-[40px] border-2 border-white px-3 outline-none rounded-md focus:border-red-400 transition duration-300"
          />
          {/* test */}
          <div className="w-[80%]">
            <label className="block mb-2 text-white">
              Upload your profile image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-transparent text-white placeholder-white border-2 border-white px-3 py-2 rounded-md outline-none transition duration-300 focus:border-red-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
          {errorMessage && (
            <div className="w-[80%] mb-4 mx-auto text-red-600 text-center font-semibold">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-[80%] h-[40px] bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 font-semibold"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
