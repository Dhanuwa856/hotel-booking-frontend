import React from "react";
import { StatusCard } from "../StatusCard/StatusCard";
import { LuUsers } from "react-icons/lu";
import { FaClipboardList, FaCheckCircle, FaClock } from "react-icons/fa"; // Additional icons
import CircularProgress from "../CircularProgress/CircularProgress";
import { DiVim } from "react-icons/di";

export const AdminHome = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        <StatusCard
          color="text-[#498bf7]"
          icon={<LuUsers />}
          label="Customers Signed Up"
          value="1243"
        />
        <StatusCard
          color="text-[#30c968]"
          icon={<FaClipboardList />}
          label="Total Bookings"
          value="567"
        />
        <StatusCard
          color="text-[#6366f1]"
          icon={<FaCheckCircle />}
          label="Confirmed Bookings"
          value="432"
        />
        <StatusCard
          color="text-[#f4c048]"
          icon={<FaClock />}
          label="Pending Bookings"
          value="135"
        />
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <div>
          <CircularProgress percentage="76" color="6366f1" />
          <p className="mt-2 text-sm font-medium text-[#021c2e]">
            Confirmed Bookings
          </p>
        </div>
        <div>
          <CircularProgress percentage="8" color="e5bb36" />
          <p className="mt-2 text-sm font-medium text-[#021c2e]">
            Pending Bookings
          </p>
        </div>
      </div>
    </div>
  );
};
