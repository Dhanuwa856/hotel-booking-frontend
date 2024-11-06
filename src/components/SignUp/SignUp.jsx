import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import uploadMedia from "../../Utils/mediaUpload";
import "./SignUp.css";

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
      navigate("/login");
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
    <div className="sign-up-bg w-full h-full bg-cover bg-top relative z-0">
      <div className="bg-[#173146] w-full h-full opacity-[50%] absolute top-0 left-0 -z-[1]"></div>
      <div className="mx-auto px-36 pt-2">
        <div className="w-full mx-auto flex justify-center mt-10">
          <img
            src="/signup-icon.png"
            alt="signup icon"
            className="w-[100px] rounded-full border-4 border-black"
          />
        </div>

        <form
          onSubmit={handleSignUp}
          className="w-[70%] mx-auto flex flex-col items-center gap-5 mt-5"
        >
          <div className="flex w-[70%] gap-4">
            <div className="relative w-full">
              <AiOutlineUser
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="First Name"
                autoFocus
                className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <AiOutlineUser
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
                size={24}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="relative w-[70%]">
            <AiOutlineMail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-[70%]">
            <BsPhone
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="text"
              required
              placeholder="Phone Number"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative w-[70%]">
            <BsPhone
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="text"
              required
              placeholder="WhatsApp Number"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
          <div className="flex w-[70%] gap-4">
            <div className="relative w-full">
              <AiOutlineLock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
                size={24}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <AiOutlineLock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80"
                size={24}
              />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[70%]">
            <label className="block mb-2 text-white">
              Upload Profile Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-transparent text-white border-2 border-white px-3 py-2 rounded-md outline-none transition duration-300 focus:border-blue-500 file:bg-blue-100 file:text-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-[70%] h-[50px] mt-4 bg-blue-500 hover:bg-blue-600 outline-none text-white font-semibold rounded-full transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {errorMessage && (
            <div className="text-red-600 text-center mb-2 bg-white/60 w-[70%] py-1 rounded">
              {errorMessage}
            </div>
          )}
          <div className="text-white mt-1 text-center pb-3">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
