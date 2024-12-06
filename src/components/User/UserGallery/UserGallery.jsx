import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import "./UserGallery.css";
import { FaRegHandPointRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";

function UserGallery() {
  const [galleryItems, setGalleryItems] = useState(null);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

  const apiURL = `${import.meta.env.VITE_API_URL}/gallery/`;

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

  if (!galleryItems) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="gallery-bg w-full h-[100px] md:h-[150px] bg-cover bg-center relative flex items-center justify-center">
        {/* Background Filter */}
        <div className="header-bg-filter w-full h-full absolute bg-blue-500 opacity-60 left-0 top-0"></div>
        {/* Title */}
        <h1 className="text-3xl md:text-5xl text-white z-10 font-bold tracking-wide capitalize text-center">
          Gallery
        </h1>
      </div>

      {/* Gallery Items */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {galleryItems.map((galleryItem, idx) => (
          <div
            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden relative pb-5"
            key={idx}
          >
            {/* Gallery Item Title */}
            <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 py-4 bg-gray-100">
              {galleryItem.name}
            </h2>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4 p-4">
              {galleryItem.images.map((image, idx) => (
                <img
                  src={image}
                  key={idx}
                  alt="Gallery"
                  className="w-full h-[150px] md:h-[180px] object-cover rounded-md border border-gray-300"
                />
              ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center mb-4">
              <Link
                to="/gallery/gallery-item"
                state={galleryItem}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium px-6 py-2 rounded-full shadow-md hover:from-red-600 hover:to-orange-600 transition-transform transform hover:scale-105 flex items-center gap-2 absolute bottom-2"
              >
                View More <FaRegHandPointRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default UserGallery;
