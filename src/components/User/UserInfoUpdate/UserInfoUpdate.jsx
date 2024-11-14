import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import uploadMedia from "../../../Utils/mediaUpload"; // This function should handle Firebase upload
import toast from "react-hot-toast";

function UserInfoUpdate() {
  const location = useLocation();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [email, setEmail] = useState(location.state.email);
  const [phoneNumber, setPhoneNumber] = useState(location.state.phone);
  const [image, setImage] = useState(location.state.image);
  const [currentImage, setCurrentImage] = useState(location.state.image);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUserPutUrl = import.meta.env.VITE_API_URL + "/users/";
  const token = localStorage.getItem("userToken");

  // Handle image file change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Display selected image immediately
      setCurrentImage(URL.createObjectURL(file));

      try {
        // Upload image to Firebase and update `image` state with the URL
        const imageUrl = await uploadMedia(file);
        setImage(imageUrl);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  // Handle form submission
  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${apiUserPutUrl}${email}`,
        {
          image: image, // URL from Firebase
          firstName,
          lastName,
          phone: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User info Updated!");
      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to update user info.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sign-up-bg w-full h-full bg-cover bg-top relative z-0">
      <div className="bg-[#173146] w-full h-full opacity-[50%] absolute top-0 left-0 -z-[1]"></div>
      <div className="mx-auto px-36 pt-2">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Update Profile
        </h2>
        <form
          onSubmit={handleUpdate}
          className="w-[50%] mx-auto flex flex-col items-center gap-5 mt-5"
        >
          {/* Email */}
          <div className="relative w-[70%]">
            <label className="block mb-1 text-white">Your Email Address</label>
            <AiOutlineMail
              className="absolute left-4 top-[70%] transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="email"
              disabled
              placeholder="Email Address"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* First Name */}
          <div className="relative w-[70%]">
            <label className="block mb-1 text-white">First Name</label>
            <AiOutlineUser
              className="absolute left-4 top-[65%] transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="text"
              required
              placeholder="Enter your new first name"
              autoFocus
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="relative w-[70%]">
            <label className="block mb-1 text-white">Last Name</label>
            <AiOutlineUser
              className="absolute left-4 top-[65%] transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="text"
              required
              placeholder="Enter your new last name"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {/* Phone Number */}
          <div className="relative w-[70%]">
            <label className="block mb-1 text-white">Phone Number</label>
            <BsPhone
              className="absolute left-4 top-[65%] transform -translate-y-1/2 text-white/80"
              size={24}
            />
            <input
              type="text"
              required
              placeholder="Enter your new phone number"
              className="w-full h-[50px] bg-[#aaa]/70 text-white placeholder-white px-12 rounded-[70px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex items-center w-[70%] gap-2">
            <div className="text-center">
              <img
                src={currentImage} // Shows updated image immediately
                alt="Current profile"
                className="w-[100px] h-[100px] rounded-full border-4 border-white object-cover object-top"
              />
            </div>

            {/* Upload New Profile Image */}
            <div className="w-[60%]">
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full bg-transparent text-white border-2 border-white px-3 py-2 rounded-md outline-none transition duration-300 focus:border-blue-500 file:bg-blue-100 file:text-blue-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[70%] h-[50px] mt-4 bg-blue-500 hover:bg-blue-600 outline-none text-white font-semibold rounded-full transition duration-300 mb-4"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfoUpdate;
