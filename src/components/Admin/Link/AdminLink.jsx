import React from "react";
import { Link } from "react-router-dom";

function AdminLink(props) {
  return (
    <Link
      to={props.link_url}
      className="flex items-center gap-4 text-white p-3 rounded-md text-lg font-medium 
                 border border-[#FF6F61] hover:bg-[#FF6F61] hover:border-transparent 
                 transition duration-300 ease-in-out cursor-pointer whitespace-nowrap"
    >
      {props.icon}
      {props.link_name}
    </Link>
  );
}

export default AdminLink;
