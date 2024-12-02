import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RoomCard2() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(4); // Number of items per page

  const apiURL = `${import.meta.env.VITE_API_URL}`;

  // Fetch paginated rooms
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${apiURL}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          pageSize,
        },
      })
      .then((res) => {
        setRooms(res.data.rooms);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, [currentPage, pageSize]);

  // Fetch categories
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${apiURL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rooms.map((room, idx) => (
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform relative mt-10"
            onMouseEnter={() => setHoveredRoom(room.roomNumber)}
            onMouseLeave={() => setHoveredRoom(null)}
            key={idx}
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
            <div className="relative overflow-hidden">
              <img
                src={room.photos}
                alt={`${room.roomNumber} image`}
                className={`w-full h-48 object-cover transition-transform duration-300 ${
                  hoveredRoom === room.roomNumber ? "scale-110" : "scale-100"
                }`}
              />
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-[#021c2e] hover:text-[#FF6F61] transition-colors duration-200">
                {room.category} Room
              </h3>
              <p className="text-gray-600 line-clamp-2">{room.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500">
                  Max Guests: {room.maxGuests}
                </span>
                <span className="">
                  {room.isAvailable ? (
                    <span className="text-green-500 font-semibold text-sm flex items-center gap-1">
                      <GoDotFill /> Available
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500 text-sm flex items-center gap-1">
                      <GoDotFill /> Unavailable
                    </span>
                  )}
                </span>
              </div>
              {categories.map((categoryItem, i) => {
                if (room.category === categoryItem.name) {
                  return (
                    <div key={i} className="flex flex-wrap gap-2 mt-2">
                      {categoryItem.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  );
                }
              })}
              <div className="flex justify-between items-center mt-4">
                <div className="text-[#021c2e] font-semibold">
                  ${room.price}
                  <span className="text-sm font-normal">/ night</span>
                </div>
                <Link
                  to={"/rooms/booking"}
                  state={room}
                  className="bg-[#FF6F61] hover:bg-[#FF5E54] text-white font-medium px-4 py-2 rounded-lg absolute bottom-2 right-5 "
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RoomCard2;
