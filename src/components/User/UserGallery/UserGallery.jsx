import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import "./UserGallery.css";
import { FaRegHandPointRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

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
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="gallery-bg w-full h-[125px] bg-cover bg-center relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[50%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.2rem] capitalize">
          Gallery
        </h1>
      </div>
      <div className="w-[90%] mx-auto grid grid-cols-2 gap-5 mt-20">
        {galleryItems.map((galleryItem, idx) => (
          <div
            className="bg-gray-300/85 border-4 border-gray-500/50 shadow-md relative pb-20"
            key={idx}
          >
            <h2 className="text-center text-3xl font-semibold text-[#617d8b] my-5">
              {galleryItem.name}
            </h2>
            <div className="grid gap-5 grid-cols-2 px-5">
              {galleryItem.images.map((image, idx) => (
                <img
                  src={image}
                  key={idx}
                  alt=""
                  className="w-[300px] h-[200px] object-cover object-center border-4 border-white shadow-md"
                />
              ))}
            </div>
            <Link
              to={"/gallery/gallery-item"}
              state={galleryItem}
              className="bg-[#ec5c4f] text-white flex items-center gap-2 font-medium mx-auto  px-5 py-2 rounded-[70px] shadow-lg hover:bg-[#ee4636] absolute bottom-3 left-1/2 -translate-x-1/2"
            >
              View More <FaRegHandPointRight />
            </Link>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default UserGallery;
