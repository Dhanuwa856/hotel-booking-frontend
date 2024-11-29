import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel, { Link } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FaStar, FaRegStar } from "react-icons/fa";

function UserFeedbackCard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackIsLoaded, setFeedbackIsLoaded] = useState(false);

  const apiUrl = `${import.meta.env.VITE_API_URL}/feedback/all`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const approvedFeedbacks = res.data.feedback.filter(
          (feedback) => feedback.status === "approved"
        );
        setFeedbacks(approvedFeedbacks);
        setFeedbackIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
      });
  }, [feedbackIsLoaded]);

  return (
    <div className="container mx-auto mt-20 cursor-grab">
      <AliceCarousel
        mouseTracking
        autoPlay="true"
        infinite="true"
        animationDuration="2000"
        disableButtonsControls="true"
        autoPlayInterval="5000"
        keyboardNavigation
        responsive={{
          0: { items: 1 }, // Small screens show 1 item
          1024: { items: 2 }, // Large screens show 2 items
        }}
      >
        {feedbacks.map((feedback, idx) => (
          <div
            className="bg-gray-800 w-[75%] md:w-[85%] px-10 py-10 mx-auto rounded-xl shadow-lg relative !overflow-visible"
            key={idx}
          >
            <p className="text-center text-white text-sm w-[70%] mx-auto relative leading-6">
              <span className="text-yellow-500 text-5xl  font-serif absolute -left-3 -top-3">
                &#8220;
              </span>
              {feedback.content}
              <span className="text-yellow-500 text-5xl font-serif absolute bottom-3">
                &#8222;
              </span>
            </p>
            <img
              src={feedback.image}
              alt="User"
              className="w-[75px] h-[75px] rounded-full object-cover object-top border-4 border-gray-300 relative  left-1/2 -translate-x-1/2 mt-2 "
            />
            <h3 className="text-white/90 font-medium text-sm text-center mt-2">
              {feedback.firstName} {feedback.lastName}
              <span className="text-[11px] text-gray-500"> (customer)</span>
            </h3>
            <div className="flex text-sm text-yellow-500 text-center gap-1 items-center justify-center mt-3">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  {index < feedback.rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
}

export default UserFeedbackCard;
