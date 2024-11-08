import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomsIsLoaded, setRoomsIsLoaded] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL + "/rooms/";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!roomsIsLoaded) {
      axios
        .get(apiURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRooms(res.data);
          setRoomsIsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching rooms:", err);
        });
    }
  }, [roomsIsLoaded]);

  function handleDelete(room_id) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the Room by id: ${room_id} ?`
    );

    if (confirmDelete) {
      const token = localStorage.getItem("userToken");

      axios
        .delete(`${apiURL}${room_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success(`Room number ${room_id} room deleted successfully`);
          setRoomsIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to delete the Room. Please try again");
        });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Admin Rooms</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-4 text-center w-1/12">Room ID</th>
              <th className="py-3 px-4 text-center w-1/12">Category</th>
              <th className="py-3 px-4 text-center w-1/12">Max Guests</th>
              <th className="py-3 px-4 text-center w-4/12">Photos</th>
              <th className="py-3 px-4 text-center w-3/12">Description</th>
              <th className="py-3 px-4 text-center w-1/12">Availability</th>
              <th className="py-3 px-4 text-center w-1/12">Price ($)</th>
              <th className="py-3 px-4 text-center w-1/12">Created At</th>
              <th className="py-3 px-4 text-center w-1/12">Edit</th>
              <th className="py-3 px-4 text-center w-1/12">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
                key={room.roomNumber}
              >
                <td className="py-3 px-4 text-left">{room.roomNumber}</td>
                <td className="py-3 px-4 text-left">{room.category}</td>
                <td className="py-3 px-4 text-left">{room.maxGuests}</td>
                <td className="py-3 px-4 text-left grid grid-cols-1 gap-2">
                  {room.photos.map((photo, num) => (
                    <img
                      src={photo}
                      alt="Room Image"
                      key={num}
                      className="w-[100px] h-[100px] object-cover rounded-md shadow-sm"
                    />
                  ))}
                </td>
                <td className="py-3 px-4 text-left whitespace-pre-line">
                  {room.description}
                </td>
                <td className="py-3 px-4 text-center">
                  {room.isAvailable ? (
                    <span className="text-green-500 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">{room.price}</td>
                <td className="py-3 px-4 text-center">
                  {new Date(room.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="text-lg text-blue-500 hover:text-blue-600">
                    <FaEdit />
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="text-lg text-red-500 hover:text-red-600"
                    onClick={() => {
                      handleDelete(room.roomNumber);
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

export default AdminRooms;
