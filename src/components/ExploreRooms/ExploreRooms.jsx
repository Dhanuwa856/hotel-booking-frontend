import { useState } from "react";

// const rooms = [
//   {
//     id: 1,
//     name: "Standard Room",
//     description: "Cozy room with essential amenities for a comfortable stay.",
//     image:
//       "https://media.cnn.com/api/v1/images/stellar/prod/1-atr-royalmansion-bedroom2-mr.jpg?c=original",
//     maxGuests: 2,
//     size: "25 m²",
//     amenities: ["Wi-Fi", "Air Conditioning", "TV"],
//     price: 99,
//   },
//   {
//     id: 2,
//     name: "Deluxe Room",
//     description: "Spacious room with modern amenities and a beautiful view.",
//     image:
//       "https://t3.ftcdn.net/jpg/06/19/00/08/360_F_619000872_AxiwLsfQqRHMkNxAbN4l5wg1MsPgBsmo.jpg",
//     maxGuests: 3,
//     size: "35 m²",
//     amenities: ["Wi-Fi", "Air Conditioning", "Mini Bar", "Work Desk"],
//     price: 149,
//   },
//   {
//     id: 3,
//     name: "Suite",
//     description:
//       "Luxurious suite with separate living area and premium amenities.",
//     image:
//       "https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg",
//     maxGuests: 4,
//     size: "50 m²",
//     amenities: [
//       "Wi-Fi",
//       "Air Conditioning",
//       "Mini Bar",
//       "Bathtub",
//       "City View",
//     ],
//     price: 249,
//   },
//   {
//     id: 4,
//     name: "Family Room",
//     description:
//       "Perfect for families, with ample space and child-friendly features.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_Z0swSYMHYpWAKqlc3UFUwVXxwM38APq0Q&s",
//     maxGuests: 5,
//     size: "45 m²",
//     amenities: [
//       "Wi-Fi",
//       "Air Conditioning",
//       "Kitchenette",
//       "Children's Play Area",
//     ],
//     price: 199,
//   },
// ];

export default function ExploreRooms() {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  return (
    <section className="bg-[#E3F2FD] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2">
          Explore Our Rooms
        </h2>
        <p className="text-center text-[#021c2e] mb-12">
          Comfort and luxury in every room
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className={`w-full h-48 object-cover transition-transform duration-300 ${
                    hoveredRoom === room.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-bold text-[#021c2e] hover:text-[#FF6F61] transition-colors duration-200">
                  {room.name}
                </h3>
                <p className="text-gray-600">{room.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500">
                    Max Guests: {room.maxGuests}
                  </span>
                  <span className="text-gray-500">Size: {room.size}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-[#021c2e] font-semibold">
                    ${room.price}{" "}
                    <span className="text-sm font-normal">/ night</span>
                  </div>
                  <button className="bg-[#FF6F61] hover:bg-[#FF5E54] text-white font-medium px-4 py-2 rounded-lg">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
