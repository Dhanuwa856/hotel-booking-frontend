import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState(null);

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
  }, []);

  const toggleBlockUser = (user) => {
    const apiUpdateURL = `${import.meta.env.VITE_API_URL}/users/block/${
      user.email
    }`;
    const confirmMessage = user.disabled
      ? `Are you sure you want to unblock ${user.firstName}?`
      : `Are you sure you want to block ${user.firstName}?`;

    if (window.confirm(confirmMessage)) {
      const token = localStorage.getItem("userToken");
      axios
        .put(
          apiUpdateURL,
          { disabled: !user.disabled },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          // Update the user's status in the state
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.email === user.email ? { ...u, disabled: !u.disabled } : u
            )
          );
        })
        .catch((err) => {
          console.error("Error toggling user block status:", err);
        });
    }
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
        <table className="w-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              {/* <th className="py-3 px-6 text-left">WhatsApp</th> */}
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Disabled</th>
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
                <td className="py-3 px-6 text-left">{user.firstName}</td>

                {/* Last Name */}
                <td className="py-3 px-6 text-left">{user.lastName}</td>

                {/* Phone */}
                <td className="py-3 px-6 text-left">{user.phone}</td>

                {/* WhatsApp */}
                {/* <td className="py-3 px-6 text-left">{user.whatsApp}</td> */}

                {/* Image */}
                <td className="py-3 px-6 text-left">
                  <img
                    src={user.image}
                    alt={`${user.firstName} Image`}
                    className="w-[50px] h-[50px] object-cover object-top rounded-full"
                  />
                </td>

                {/* Type */}
                <td className="py-3 px-6 text-left">{user.type}</td>
                <td className="py-3 px-6 text-center">
                  {user.disabled ? (
                    <span className="text-red-500 font-semibold">Disabled</span>
                  ) : (
                    <span className="text-green-500 font-semibold">
                      Enabled
                    </span>
                  )}
                </td>

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
                  <button
                    className={` text-white px-4 py-2 rounded-md transition text-[12px] font-medium ${
                      user.disabled === true
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => toggleBlockUser(user)}
                  >
                    {user.disabled ? "Enable" : "Disable"}
                  </button>
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
