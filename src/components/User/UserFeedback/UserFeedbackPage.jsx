import React from "react";
import UserFeedbackCard from "../UserFeedbackCard/UserFeedbackCard";
import { motion } from "framer-motion";

function UserFeedbackPage() {
  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <motion.h2
          className="text-4xl font-bold text-center text-[#021c2e] mb-2"
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
            delay: 0.4,
            duration: 1,
          }}
        >
          What Our Guests Say
        </motion.h2>
        <motion.p
          className="text-center text-[#021c2e] mb-5"
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
            delay: 0.4,
            duration: 1,
          }}
        >
          Real stories of comfort and satisfaction from our valued guests
        </motion.p>
      </div>
      <UserFeedbackCard />
    </>
  );
}

export default UserFeedbackPage;
