import React from "react";
import { FaRegBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

export const AdminHeader = () => {
  return (
    <header className="bg-[#E3F2FD] flex items-center justify-between px-10 py-3 shadow-xl">
      <div className="flex items-center gap-5">
        <img src="https://placehold.co/50x50" alt="Hotel Logo" />
        <h2 className="text-2xl capitalize font-bold text-[#607D8B]">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-5">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search..."
          className="bg-transparent w-64 p-1 rounded-md  border-solid border-[#607D8B] border-2  outline-none	"
        />
        <button className="h-10 w-10 hover:bg-[#ddd] flex items-center justify-center rounded-lg hover:text-white">
          <FaRegBell />
        </button>
        <button className="h-5 w-5">
          <CiUser />
        </button>
      </div>
    </header>
  );
};
