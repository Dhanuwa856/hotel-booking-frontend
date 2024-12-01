import React from "react";
import { GiNorthStarShuriken } from "react-icons/gi";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="container mx-auto mt-10 py-12 px-6 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row  gap-10">
        {/* Images Section */}
        <div className="flex flex-wrap lg:w-1/2 gap-2 justify-center lg:justify-end">
          <motion.img
            src="/about1.jpg"
            alt="Image 1"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
            initial={{
              scale: 0, // Start closer to the end value
              opacity: 0,
            }}
            whileInView={{
              scale: 0.9, // Final scale
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2, // Slightly increased delay for stagger effect
              ease: "easeInOut", // Smooth transition
              duration: 1.5, // Longer duration for smoothness
            }}
          />

          <motion.img
            src="/about2.jpg"
            alt="Image 2"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src="/about3.jpg"
            alt="Image 3"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src="/about4.jpg"
            alt="Image 4"
            className="w-[45%] h-[150px] md:h-[250px] object-cover"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
              scale: 0.9,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h2
            className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 uppercase"
            initial={{
              y: 70,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-4 text-center md:text-left"
            initial={{
              y: 70,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            Welcome to Hotel Name, where luxury meets comfort. Nestled in the
            heart of Hanguranketha, we offer an unparalleled experience of
            tranquility and indulgence. Our elegantly designed rooms and
            top-notch facilities cater to every guest's needs.
          </motion.p>
          <motion.p
            className="text-gray-600 text-center md:text-left"
            initial={{
              y: 70,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            Whether you're here for a relaxing getaway or a business retreat,
            our dedicated team ensures that every moment of your stay is
            memorable. Discover the charm, warmth, and hospitality that sets us
            apart. We look forward to hosting you!
          </motion.p>
          {/* Bullet Points */}
          <ul className="hidden md:block md:list-inside text-gray-600 space-y-4 mt-4">
            <motion.li
              className="flex items-center gap-2"
              initial={{
                y: 70,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <GiNorthStarShuriken /> Over 20 years of exceptional hospitality
              experience
            </motion.li>
            <motion.li
              className="flex items-center gap-2"
              initial={{
                y: 70,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <GiNorthStarShuriken /> Luxurious rooms with world-class amenities
            </motion.li>
            <motion.li
              className="flex items-center gap-2"
              initial={{
                y: 70,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.7,
                ease: "easeInOut",
              }}
            >
              <GiNorthStarShuriken /> Located in the heart of scenic
              Hanguranketha
            </motion.li>
            <motion.li
              className="flex items-center gap-2"
              initial={{
                y: 70,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <GiNorthStarShuriken /> Personalized services tailored to meet
              your needs
            </motion.li>
            <motion.li
              li
              className="flex items-center gap-2"
              initial={{
                y: 70,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 1.9,
                ease: "easeInOut",
              }}
            >
              <GiNorthStarShuriken />
              Exclusive offers for weddings, conferences, and retreats
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
