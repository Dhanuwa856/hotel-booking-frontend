import React from "react";
import UserFeedbackCard from "../UserFeedbackCard/UserFeedbackCard";

function UserFeedbackPage() {
  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2">
          What Our Guests Say
        </h2>
        <p className="text-center text-[#021c2e] mb-5">
          Real stories of comfort and satisfaction from our valued guests
        </p>
      </div>
      <UserFeedbackCard />
    </>
  );
}

export default UserFeedbackPage;
