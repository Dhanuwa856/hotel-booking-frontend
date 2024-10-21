import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "../NavLink/NavLink";

function NavBar() {
  return (
    <div className="flex items-center justify-between bg-[#E3F2FD] px-5 py-4 shadow-xl">
      <div>
        <Link to="/">
          <img
            src="https://placehold.co/200x50"
            alt="Hotel Logo"
            className="w-[200px] h-[50px] cursor-pointer"
          />
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-[#607D8B]">
        <NavLinks link_url="/" link_name="Home" />
        <NavLinks link_url="/rooms" link_name="Rooms" />
        <NavLinks link_url="/offers" link_name="Offers" />
        <NavLinks link_url="/contact" link_name="Contact" />
        <NavLinks link_url="/about-us" link_name="About Us" />
      </nav>
      <div className="flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
          alt="User Image"
          className="w-[50px] rounded-full cursor-pointer"
        />
        <span className="text-[#607D8B] text-lg font-medium cursor-pointer hover:text-[#FF6F61] delay-75 ">
          DHANUwa
        </span>
      </div>
    </div>
  );
}

export default NavBar;
