import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../../Utils/mediaUpload";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateGallery() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [id, setId] = useState(location.state._id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL + "/gallery/";
  const token = localStorage.getItem("userToken");

  if (token == null) {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

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
          `${apiUrl}${id}`,
          {
            description: description,
            images: uploadedImages,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          navigate("/admin/gallery/");
        });
    } catch (err) {
      setLoading(false);
      toast.error("Error gallery item update");
    }
    toast.success("Galley item update successfully.");
    return;
  }

  function handleImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Update Gallery Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            disabled
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="images">
            New Image Upload (Multiple)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="w-full"
            onChange={handleImageChange}
            multiple
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
            "Update Gallery Item"
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateGallery;
