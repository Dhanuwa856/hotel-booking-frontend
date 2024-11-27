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
      <div className="container mx-auto px-4 mt-5">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2">
          Explore Our Rooms
        </h2>
        <p className="text-center text-[#021c2e] mb-5">
          Comfort and luxury in every room
        </p>
        {/* <RoomCard /> */}
      </div>
      <RoomCard />
    </>
  );
}

export default UserRoomPage;
