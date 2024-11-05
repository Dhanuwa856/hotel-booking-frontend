import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_URL + "/gallery/";

  useState(() => {
    axios
      .get(apiURL)
      .then((res) => {
        setGalleryItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
      });
  });
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
                  <button className="text-red-400 hover:text-red-500">
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
