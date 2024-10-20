import React from "react";
import { NavLink } from "react-router-dom";
import "../NavLink/NavLink.css";

function NavLinks(props) {
  return (
    <NavLink to={props.link_url}>
      <span className="font-semibold text-lg nav-text hover:text-[#FF6F61]">
        {props.link_name}
      </span>
    </NavLink>
  );
}

export default NavLinks;
