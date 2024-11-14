import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import "./UserGalleryItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function UserGalleryItem() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [images, setImages] = useState(location.state.images);
  const [description, setDescription] = useState(location.state.description);
  return (
    <>
      <NavBar />
      <div className="gallery-item-bg w-full h-[125px] bg-cover bg-bottom relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#306f9c] opacity-[20%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.05rem] capitalize">
          {name}
        </h1>
      </div>
      <div className="bg-blue-200 mt-10 text-blue-900 w-[80%] mx-auto text-justify text-lg font-medium capitalize px-5 py-4">
        <p>{description}</p>
      </div>
      <div className="w-[80%] h-[60vh] mx-auto mt-16">
        <Carousel
          showArrows={true}
          autoPlay={true}
          thumbWidth={150}
          useKeyboardArrows={true}
          transitionTime={2}
        >
          {images.map((image, idx) => (
            <div key={idx}>
              <img src={image} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default UserGalleryItem;
