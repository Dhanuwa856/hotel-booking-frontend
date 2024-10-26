import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const apiGetAllUrl = `${import.meta.env.VITE_API_URL}/users/`;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(apiGetAllUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  });

  const handleUpdate = (id, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === id ? updatedUser : user))
    );
    setEditUser(null); // Exit edit mode
  };

  if (!users) {
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
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Admin Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">WhatsApp</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-center">Email Verified</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                {/* Email (non-editable) */}
                <td className="py-3 px-6 text-left">{user.email}</td>

                {/* First Name */}
                <td className="py-3 px-6 text-left">
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={user.firstName}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr._id === user._id
                              ? { ...usr, firstName: e.target.value }
                              : usr
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    user.firstName
                  )}
                </td>

                {/* Last Name */}
                <td className="py-3 px-6 text-left">
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={user.lastName}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr._id === user._id
                              ? { ...usr, lastName: e.target.value }
                              : usr
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    user.lastName
                  )}
                </td>

                {/* Phone */}
                <td className="py-3 px-6 text-left">
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr._id === user._id
                              ? { ...usr, phone: e.target.value }
                              : usr
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    user.phone
                  )}
                </td>

                {/* WhatsApp */}
                <td className="py-3 px-6 text-left">
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={user.whatsApp}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr._id === user._id
                              ? { ...usr, whatsApp: e.target.value }
                              : usr
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    user.whatsApp
                  )}
                </td>

                {/* Image */}
                <td className="py-3 px-6 text-left">
                  {editUser === user._id ? (
                    <input
                      type="text"
                      value={user.image}
                      onChange={(e) =>
                        setUsers((prev) =>
                          prev.map((usr) =>
                            usr._id === user._id
                              ? { ...usr, image: e.target.value }
                              : usr
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  ) : (
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  )}
                </td>

                {/* Type */}
                <td className="py-3 px-6 text-left">{user.type}</td>

                {/* Email Verified */}
                <td className="py-3 px-6 text-center">
                  {user.emailVerified ? (
                    <span className="text-green-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-6 text-center">
                  {editUser === user._id ? (
                    <button
                      onClick={() => handleUpdate(user._id, user)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditUser(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
