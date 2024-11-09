import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState(null);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL + "/gallery/";

  const token = localStorage.getItem("userToken");
  if (token == null) {
    navigate("/login");
  }

  useEffect(() => {
    if (!galleryIsLoaded) {
      axios
        .get(apiURL)
        .then((res) => {
          setGalleryItems(res.data);
          setGalleryIsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching gallery:", err);
        });
    }
  }, [galleryIsLoaded]);

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category by id: ${id} ?`
    );

    if (confirmDelete) {
      axios
        .delete(`${apiURL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Gallery Item deleted successfully");
          setGalleryIsLoaded(false);
        })
        .catch((err) => {
          console.error("Error deleting gallery:", err);
          toast.error("Failed to delete the gallery item. Please try again");
        });
    }
  }
  if (!galleryItems) {
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
    <div className="container mx-auto p-6">
      <div className="fixed right-8 bottom-6">
        <button
          className="w-[50px] h-[50px] bg-blue-400 rounded-full text-white text-2xl flex items-center justify-center hover:bg-blue-500 transition shadow-lg z-10"
          onClick={() => {
            navigate("/admin/add-gallery");
          }}
        >
          <FaPlus />
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Admin Gallery</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left w-[40%]">Images</th>
              <th className="py-3 px-6 text-center">Edit</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {galleryItems.map((galleryItem, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-6 text-left">{galleryItem.name}</td>
                <td className="py-3 px-6 text-left max-w-xs ">
                  {galleryItem.description}
                </td>
                <td className="py-3 px-6 text-left grid grid-cols-2 md:grid-cols-3 gap-2">
                  {galleryItem.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt="gallery item"
                      className="w-[100px] h-[100px] object-cover rounded-md shadow-sm"
                    />
                  ))}
                </td>
                <td className="py-3 px-6 text-center text-xl">
                  <Link
                    to={"/admin/update-gallery"}
                    className="text-blue-400 hover:text-blue-500 p-2"
                    state={galleryItem}
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="py-3 px-6 text-center text-xl">
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => {
                      handleDelete(galleryItem._id);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminGallery;
