import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const AdminCategories = () => {
  // Sample category data
  const [categories, setCategories] = useState(null);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  const navigate = useNavigate();

  const apiURL = `${import.meta.env.VITE_API_URL}/categories`;

  const token = localStorage.getItem("userToken");
  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(apiURL)
        .then((res) => {
          setCategories(res.data);
          setCategoriesIsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching category:", err);
        });
    }
  }, [categoriesIsLoaded]);

  function handleDelete(name) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category "${name}"?`
    );

    if (confirmDelete) {
      axios
        .delete(`${apiURL}/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Category deleted successfully");
          setCategoriesIsLoaded(false);
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          alert("Failed to delete the category. Please try again.");
        });
    }
  }

  if (!categories) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed right-8 bottom-6">
        <button
          className="w-[50px] h-[50px] bg-blue-400 rounded-full text-white text-2xl flex items-center justify-center hover:bg-blue-500 transition shadow-lg z-10"
          onClick={() => {
            navigate("/admin/add-categories");
          }}
        >
          <FaPlus />
        </button>
      </div>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Admin Categories
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Features</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Edit</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                {/* Name is non-editable */}
                <td className="py-3 px-6 text-left">{category.name}</td>

                {/* Price */}
                <td className="py-3 px-6 text-left">{category.price}</td>

                {/* Description */}
                <td className="py-3 px-6 text-left">{category.description}</td>

                {/* Features */}
                <td className="py-3 px-6 text-left">
                  {category.features.map((features, i) => (
                    <li key={i} className="list-none">
                      {features}
                    </li>
                  ))}
                </td>

                {/* Image */}
                <td className="py-3 px-6 text-left">
                  <img
                    src={category.image}
                    alt={`${category.name} Image`}
                    className="w-[50px] h-[50px] object-cover object-center"
                  />
                </td>

                {/* Actions */}
                <td className="py-3 px-6 text-center">
                  <Link
                    to={"/admin/update-categories"}
                    state={category}
                    className="text-xl text-blue-500 hover:text-blue-600"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="py-3 px-6 text-center text-xl text-red-500 hover:text-red-600">
                  <button
                    onClick={() => {
                      handleDelete(category.name);
                    }}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
