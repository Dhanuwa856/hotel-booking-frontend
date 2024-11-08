import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import uploadMedia from "../../../Utils/mediaUpload";
import { useLocation, useNavigate } from "react-router-dom";

function AddRoom() {
  const location = useLocation();
  const [roomNumber, setRoomNumber] = useState(location.state.roomNumber);
  const [category, setCategory] = useState(location.state.category);
  const [maxGuests, setMaxGuests] = useState(location.state.maxGuests);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL + "/rooms/";
  const token = localStorage.getItem("userToken");

  if (!token) {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true); // Start loading

    let uploadedImages = [];

    // Check if there are new images to upload
    if (images.length > 0) {
      // Upload new images
      uploadedImages = await Promise.all(
        images.map((image) => uploadMedia(image))
      );
    } else {
      // If no new images, keep the existing images
      uploadedImages = location.state.images;
    }

    try {
      await axios
        .put(
          `${apiUrl}${roomNumber}`,
          {
            category,
            maxGuests,
            description,
            price,
            photos: uploadedImages,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false); // Stop loading
          navigate("/admin/rooms/");
          toast.success(`Room ${roomNumber} update successfully.`);
        });
    } catch (err) {
      setLoading(false); // Stop loading
      toast.error("Error adding room.");
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="roomNumber">
            Room Number
          </label>
          <input
            type="text"
            id="roomNumber"
            disabled
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className={`w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="maxGuests">
            Max Guests
          </label>
          <input
            type="number"
            id="maxGuests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="photos">
            Upload Photos
          </label>
          <input
            type="file"
            id="photos"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
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
            "Update Room"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
