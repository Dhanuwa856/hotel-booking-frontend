import { useState } from "react";
import RoomCard from "../User/RoomCard/RoomCard";

export default function ExploreRooms() {
  return (
    <section className="bg-[#E3F2FD] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2">
          Explore Our Rooms
        </h2>
        <p className="text-center text-[#021c2e] mb-12">
          Comfort and luxury in every room
        </p>
        {/* <RoomCard /> */}
      </div>
    </section>
  );
}
