import React from "react";
import NavBar from "../../NavBar/NavBar";
import "../UserRooms/UserRooms.css";
import RoomCard from "../RoomCard/RoomCard";

function UserRoomPage() {
  return (
    <>
      <NavBar />
      <div className="room-bg w-full h-[125px] bg-cover bg-center relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[50%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.2rem] capitalize">
          Rooms
        </h1>
      </div>
      <RoomCard />
    </>
  );
}

export default UserRoomPage;
