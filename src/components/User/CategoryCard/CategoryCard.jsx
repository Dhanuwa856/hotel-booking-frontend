import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import axios from "axios";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);

  const apiURL = `${import.meta.env.VITE_API_URL}/categories/`;
  useEffect(() => {
    axios
      .get(apiURL)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching category:", err);
      });
  }, []);

  return (
    <section className="container mx-auto bg-gray-100 mt-10 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-4">
          Explore Our Room Categories
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="bg-white shadow-md mt-4 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 my-2">
                    {category.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Explore More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCard;
