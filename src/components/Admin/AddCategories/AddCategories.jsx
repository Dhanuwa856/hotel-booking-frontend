import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import uploadMedia from "../../../Utils/mediaUpload";

function AddCategories() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL + "/categories/";
  const token = localStorage.getItem("userToken");

  if (!token) {
    window.location.href = "/login";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true); // Start loading

    try {
      const imgUrl = await uploadMedia(image);
      await axios
        .post(
          apiUrl,
          {
            name: name,
            price: price,
            description: description,
            features: features.split(","),
            image: imgUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("Category added successfully:", res.data);
          if (
            res?.data?.error?.errorResponse?.errmsg?.includes("duplicate key")
          ) {
            setError(
              "Category name already exists. Please choose a different name."
            );
          } else {
            toast.success("Category added successfully!");
          }
          setLoading(false); // Stop loading
        });
    } catch (err) {
      setLoading(false); // Stop loading
      toast.error(err);
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add Category
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
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Features</label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Image Upload
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full"
            onChange={(e) => setImage(e.target.files[0])}
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
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddCategories;
