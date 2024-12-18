import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../../Utils/mediaUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function UpdateCategories() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/categories";
  }

  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [description, setDescription] = useState(location.state.description);
  const [features, setFeatures] = useState(location.state.features);
  const [newFeature, setNewFeature] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(features);

  const apiUrl = import.meta.env.VITE_API_URL + "/categories/";
  const token = localStorage.getItem("userToken");

  if (token == null) {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true); // Start loading

    if (!image) {
      try {
        await axios
          .put(
            `${apiUrl}${name}`,
            {
              name: name,
              price: price,
              description: description,
              features: features,
              image: location.state.image,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // console.log("Category added successfully:", res.data);
            toast.success("Category updated successfully!");

            setLoading(false); // Stop loading
            navigate("/admin/categories/");
          });
      } catch (err) {
        setLoading(false); // Stop loading
        toast.error(err);
        console.error(err);
      }
      return;
    }

    try {
      const imgUrl = await uploadMedia(image);
      await axios
        .put(
          `${apiUrl}${name}`,
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
          toast.success("Category updated successfully!");
          setLoading(false); // Stop loading
          navigate("/admin/categories/");
        });
    } catch (err) {
      setLoading(false); // Stop loading
      toast.error(err);
      console.error(err);
    }
  }
  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature(""); // Clear the input field
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Update Category
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            disabled
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            required
          />
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
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter a feature"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Display Features List */}
          <div className="mt-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-md"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 hover:underline text-lg"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
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
            "Update Category"
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateCategories;
