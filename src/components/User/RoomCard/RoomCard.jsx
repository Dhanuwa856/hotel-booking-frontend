import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

function RoomCard() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(6); // Number of items per page
  const [roomCategory, setRoomCategory] = useState("All");

  console.log(roomCategory);

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
          category: roomCategory,
        },
      })
      .then((res) => {
        setRooms(res.data.rooms);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, [currentPage, pageSize, roomCategory]);

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
      <div className="flex items-center w-full max-w-[250px] gap-2 mt-4">
        {/* Filter Icon */}
        <button className="p-2 bg-[#FF6F61] text-white rounded-lg focus:outline-none hover:bg-[#e65c50]">
          <FaFilter className="w-4 h-4" />
        </button>
        {/* Dropdown */}
        <select
          value={roomCategory}
          onChange={(e) => {
            setRoomCategory(e.target.value);
          }}
          className="appearance-none border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FF6F61] focus:border-[#FF6F61] font-medium"
        >
          <option value="All">All Category</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rooms.map((room, idx) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform relative mt-10"
            onMouseEnter={() => setHoveredRoom(room.roomNumber)}
            onMouseLeave={() => setHoveredRoom(null)}
            key={idx}
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
                  className="bg-gradient-to-r from-[#FF6F61] to-[#FF5E54] hover:from-[#FF5E54] hover:to-[#FF6F61] text-white font-medium px-4 py-2 rounded-lg absolute bottom-2 right-5 transition duration-500"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-4 gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-[40px] h-[40px] border border-gray-500/80 ${
                currentPage === page
                  ? "bg-[#FF6F61] text-white"
                  : "bg-white/60 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomCard;
