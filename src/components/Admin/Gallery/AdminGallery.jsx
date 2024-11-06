import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state

  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");
  const apiURL = import.meta.env.VITE_API_URL + "/gallery/";

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = () => {
    setLoading(true);
    axios
      .get(apiURL)
      .then((res) => {
        setGalleryItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setLoading(false); // Ensure loading is set to false even on error
      });
  };

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the gallery item "${id}"?`
    );
    if (confirmDelete) {
      axios
        .delete(`${apiURL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Gallery item deleted successfully");
          fetchGalleryItems(); // Re-fetch the gallery items after deletion
        })
        .catch((err) => {
          console.error("Error deleting gallery item:", err);
          alert("Failed to delete the gallery item. Please try again.");
        });
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-right" />

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
        {loading ? (
          <div>Loading...</div> // Show loading state while fetching
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Images</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {galleryItems.map((galleryItem, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-6 text-left">{galleryItem.name}</td>
                  <td className="py-3 px-6 text-left">
                    {galleryItem.description}
                  </td>
                  <td className="py-3 px-6 text-left grid grid-cols-2 gap-2">
                    {galleryItem.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt="gallery image"
                        className="w-[50px] h-[50px] "
                      />
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center text-xl gap-5">
                    <button className="text-blue-400 hover:text-blue-500 p-2">
                      <FaEdit />
                    </button>
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
        )}
      </div>
    </div>
  );
}

export default AdminGallery;
