import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import uploadMedia from "../../../Utils/mediaUpload";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function AddCategories() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  // const [features, setFeatures] = useState("");
  const [feature, setFeature] = useState("");
  const [featuresList, setFeaturesList] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL + "/categories/";
  const token = localStorage.getItem("userToken");

  if (token == null) {
    navigate("/login");
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
            features: featuresList,
            image: imgUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (
            res?.data?.error?.errorResponse?.errmsg?.includes("duplicate key")
          ) {
            setError(
              "Category name already exists. Please choose a different name."
            );
          } else {
            navigate("/admin/categories/");
          }
          setLoading(false); // Stop loading
        });
    } catch (err) {
      setLoading(false); // Stop loading
      toast.error(err);
      console.error(err);
    }
  }
  const handleAddFeature = () => {
    if (feature.trim() !== "") {
      setFeaturesList([...featuresList, feature.trim()]);
      setFeature(""); // Clear the input field
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = featuresList.filter((_, i) => i !== index);
    setFeaturesList(updatedFeatures);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add Category
      </h2>
      {/* <form onSubmit={handleSubmit}> */}
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
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="Enter a feature"
          />
          <button
            onClick={handleAddFeature}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Display Features List */}
        <div className="mt-4">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 mb-2 rounded-md"
            >
              <span>{item}</span>
              <button
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
        onClick={handleSubmit}
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
      {/* </form> */}
    </div>
  );
}

export default AddCategories;
