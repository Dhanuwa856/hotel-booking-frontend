import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { motion } from "framer-motion";

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
        <motion.h2
          className="text-4xl font-bold text-center text-[#021c2e] mb-4"
          initial={{
            y: 70,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 1,
          }}
        >
          Explore Our Room Categories
        </motion.h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <motion.div
                className="bg-white shadow-md mt-4 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                initial={{
                  y: 70,
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg text-gray-800 text-center font-semibold">
                    {category.name}
                  </h3>
                  <p className="mt-2  text-sm text-gray-400 text-center line-clamp-2">
                    {category.description}
                  </p>
                  <div className=" font-bold mt-2 text-sm text-gray-500 ">
                    ${category.price}
                    <span className="text-sm font-normal">/ night</span>
                  </div>
                  <button className="mt-4 w-full bg-[#FF6F61] text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                    Explore More
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCard;
