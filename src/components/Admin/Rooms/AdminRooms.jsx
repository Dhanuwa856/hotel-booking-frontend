import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL + "/rooms/";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, []);

  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedRoom) return;

    const token = localStorage.getItem("userToken");
    try {
      await axios.delete(`${apiURL}${selectedRoom.roomNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(
        rooms.filter((room) => room.roomNumber !== selectedRoom.roomNumber)
      );
      setShowDeleteModal(false);
      setSelectedRoom(null);
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Admin Rooms</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-center">Room Number</th>
              <th className="py-3 px-6 text-center">Category</th>
              <th className="py-3 px-6 text-center">Max Guests</th>
              <th className="py-3 px-6 text-center">Photos</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Is Available</th>
              <th className="py-3 px-6 text-center">Price ($)</th>
              <th className="py-3 px-6 text-center">Created At</th>
              <th className="py-3 px-6 text-center">Edit</th>
              <th className="py-3 px-6 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
                key={room.roomNumber}
              >
                <td className="py-3 px-6 text-left">{room.roomNumber}</td>
                <td className="py-3 px-6 text-left">{room.category}</td>
                <td className="py-3 px-6 text-left">{room.maxGuests}</td>
                <td className="py-3  text-left grid grid-cols-2 gap-2 w-auto">
                  {room.photos.map((photo, num) => (
                    <img
                      src={photo}
                      alt="Room Image"
                      key={num}
                      className="h-[50px] object-cover object-center"
                    />
                  ))}
                </td>
                <td className="py-3 px-6 text-left">{room.description}</td>
                <td className="py-3 px-6 text-left">
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
                <td className="py-3 px-6 text-left">{room.price}</td>
                <td className="py-3 px-6 text-left">
                  {" "}
                  {new Date(room.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="text-lg text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(room)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="text-lg text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteClick(room)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete room number{" "}
              <span className="font-bold">{selectedRoom.roomNumber}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRooms;
