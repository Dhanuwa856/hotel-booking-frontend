import React from "react";
import { GiNorthStarShuriken } from "react-icons/gi";

const AboutUs = () => {
  return (
    <section className="container mx-auto mt-10 py-12 px-6 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row  gap-10">
        {/* Images Section */}
        <div className="flex flex-wrap lg:w-1/2 gap-2 justify-center lg:justify-end">
          <img
            src="/about1.jpg"
            alt="Image 1"
            className="w-[45%] h-[150px] md:h-[250px] object-cover scale-90"
          />
          <img
            src="/about2.jpg"
            alt="Image 2"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
          />
          <img
            src="/about3.jpg"
            alt="Image 3"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
          />
          <img
            src="/about4.jpg"
            alt="Image 4"
            className="w-[45%] h-[150px] md:h-[250px] scale-90 object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 uppercase">
            About Us
          </h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            Welcome to Hotel Name, where luxury meets comfort. Nestled in the
            heart of Hanguranketha, we offer an unparalleled experience of
            tranquility and indulgence. Our elegantly designed rooms and
            top-notch facilities cater to every guest's needs.
          </p>
          <p className="text-gray-600 text-center md:text-left">
            Whether you're here for a relaxing getaway or a business retreat,
            our dedicated team ensures that every moment of your stay is
            memorable. Discover the charm, warmth, and hospitality that sets us
            apart. We look forward to hosting you!
          </p>
          {/* Bullet Points */}
          <ul className="hidden md:block md:list-inside text-gray-600 space-y-4 mt-4">
            <li className="flex items-center gap-2">
              <GiNorthStarShuriken /> Over 20 years of exceptional hospitality
              experience
            </li>
            <li className="flex items-center gap-2">
              <GiNorthStarShuriken /> Luxurious rooms with world-class amenities
            </li>
            <li className="flex items-center gap-2">
              <GiNorthStarShuriken /> Located in the heart of scenic
              Hanguranketha
            </li>
            <li className="flex items-center gap-2">
              <GiNorthStarShuriken /> Personalized services tailored to meet
              your needs
            </li>
            <li li className="flex items-center gap-2">
              <GiNorthStarShuriken />
              Exclusive offers for weddings, conferences, and retreats
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
