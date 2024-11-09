import React, { useEffect, useState } from "react";
import { StatusCard } from "../StatusCard/StatusCard";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList, FaCheckCircle, FaClock } from "react-icons/fa"; // Additional icons
import CircularProgress from "../CircularProgress/CircularProgress";
import axios from "axios";
import decodeToken from "../../decodeToken";
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const [stats, setStats] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL + "/users/stats";
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const user = decodeToken(token);

  if (user.type == "customer") {
    window.location.href = "/";
  }

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin stats:", error);
      });
  }, [stats]);

  if (!stats) {
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
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        <StatusCard
          color="text-[#498bf7]"
          icon={<LuUsers />}
          label="Customers Signed Up"
          value={stats.totalUsers}
        />
        <StatusCard
          color="text-[#30c968]"
          icon={<FaClipboardList />}
          label="Total Bookings"
          value={stats.totalBookings}
        />
        <StatusCard
          color="text-[#6366f1]"
          icon={<FaCheckCircle />}
          label="Confirmed Bookings"
          value={stats.confirmedBookings}
        />
        <StatusCard
          color="text-[#f4c048]"
          icon={<FaClock />}
          label="Pending Bookings"
          value={stats.pendingBookings}
        />
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <div>
          <CircularProgress
            percentage={stats.confirmedPercentage}
            color="6366f1"
          />
          <p className="mt-2 text-sm font-medium text-[#021c2e]">
            Confirmed Bookings
          </p>
        </div>
        <div>
          <CircularProgress
            percentage={stats.pendingPercentage}
            color="e5bb36"
          />
          <p className="mt-2 text-sm font-medium text-[#021c2e]">
            Pending Bookings
          </p>
        </div>
      </div>
    </div>
  );
};
