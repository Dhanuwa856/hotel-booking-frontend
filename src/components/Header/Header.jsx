import React from "react";
import "../Header/Header.css";
import { CiSearch } from "react-icons/ci";
const Header = () => {
  return (
    <div className="bg-[#E3F2FD] w-full h-screen">
      <div className="header w-full h-screen relative">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[30%] left-0 top-0"></div>
        <div className="absolute input-area backdrop-blur-lg w-[40%] mt-[50px] left-1/2 -translate-x-1/2 rounded-lg px-[50px] py-[50px] shadow-2xl">
          <h2 className="text-3xl font-bold text-[#021c2e] mb-4 capitalize">
            Book Your Stay
          </h2>
          <form action="">
            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Check-in Date:
              </span>
              <input
                type="date"
                name=""
                id=""
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
                required
              />
            </div>
            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                Check-out Date:
              </span>
              <input
                type="date"
                name=""
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
                required
              />
            </div>
            <div className="block mt-5">
              <span className="text-md font-medium text-[#021c2e] capitalize">
                choosing room categorie:
              </span>
              <select
                name=""
                id=""
                className="w-full h-[50px] rounded-lg pl-3 pr-3 outline-0 text-[#607D8B] uppercase"
              >
                <option value="1">Standard</option>
                <option value="2">Deluxe</option>
                <option value="3">Luxury</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 text-white font-medium text-lg bg-[#FF6F61] w-full h-[50px]  justify-center rounded-lg mt-5 hover:bg-[#ca5146] capitalize"
            >
              <CiSearch /> Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
