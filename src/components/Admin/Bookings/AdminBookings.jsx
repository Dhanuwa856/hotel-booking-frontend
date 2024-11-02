import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Update the API URLs
  const apiGetAllUrl = `${import.meta.env.VITE_API_URL}/booking/all`;
  const apiUpdateUrl = `${import.meta.env.VITE_API_URL}/booking/change/`;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(apiGetAllUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setStatus(booking.status);
    setReason(booking.reason);
    setNotes(booking.notes);
    setShowModal(true);
  };

  const handleEdit = () => {
    const token = localStorage.getItem("userToken");
    axios
      .put(
        `${apiUpdateUrl}${selectedBooking.booking_id}`,
        { status, reason, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Update bookings with the edited data
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === selectedBooking.booking_id
              ? { ...booking, status, reason, notes }
              : booking
          )
        );
        setShowModal(false); // Close modal after success
      })
      .catch((err) => {
        console.error("Error updating booking:", err);
      });
  };

  if (!bookings) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Admin Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">Room ID</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Check-in Date</th>
              <th className="py-3 px-6 text-left">Check-out Date</th>
              <th className="py-3 px-6 text-left">Guests</th>
              <th className="py-3 px-6 text-left">Reason</th>
              <th className="py-3 px-6 text-left">Notes</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {bookings.map((booking) => (
              <tr
                key={booking.booking_id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-6 text-left">{booking.booking_id}</td>
                <td className="py-3 px-6 text-left">{booking.room_id}</td>
                <td className="py-3 px-6 text-left">{booking.email}</td>
                <td>
                  <span
                    className={`py-1 px-2 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-500"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="py-3 px-6 text-left">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">{booking.guests}</td>
                <td className="py-3 px-6 text-left">{booking.reason}</td>
                <td className="py-3 px-6 text-left">{booking.notes}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => openModal(booking)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Reason</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Notes</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleEdit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
