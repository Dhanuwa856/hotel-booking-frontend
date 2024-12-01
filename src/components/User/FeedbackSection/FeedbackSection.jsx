import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

function FeedbackForm() {
  const [selectedRating, setSelectedRating] = useState(0); // Store the selected rating
  const [description, setDescription] = useState(""); // Store the comment
  const [submitted, setSubmitted] = useState(false); // Handle form submission

  const apiURL = `${import.meta.env.VITE_API_URL}/feedback/`;
  const token = localStorage.getItem("userToken");

  async function handleSubmit(e) {
    e.preventDefault();

    const toastId = toast.loading("Submitting feedback...");
    if (!token) {
      toast.error("You need to log in to make a feedback.");
      toast.dismiss(toastId);
      return; // Stop further execution if not logged in
    }

    try {
      if (selectedRating === 0) {
        toast.error("Please select a rating!");
        return;
      }

      // Confirmation Dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit this feedback?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        // Toast notification for loading

        // Proceed with API call
        const response = await axios.post(
          apiURL,
          {
            content: description,
            rating: selectedRating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle success response
        toast.dismiss(toastId);
        toast.success("Your feedback has been added!");

        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your feedback has been added.",
          confirmButtonText: "OK",
        });

        // Save feedback locally
        localStorage.setItem("userRating", selectedRating);
        localStorage.setItem("userComment", description);
        setSubmitted(true);
      } else {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "Your feedback submission was cancelled.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      // Handle error response
      toast.error("There was an issue submitting your feedback.");
      toast.dismiss(toastId);
    }
  }

  // Load rating from local storage when the component mounts
  useEffect(() => {
    const savedRating = localStorage.getItem("userRating");
    const savedComment = localStorage.getItem("userComment");
    if (savedRating) {
      setSelectedRating(parseInt(savedRating, 10));
      setDescription(savedComment || "");
      setSubmitted(true); // Mark as submitted if feedback exists
    }
  }, []);

  const handleRatingClick = (rating) => {
    // Prevent rating change if already submitted
    if (submitted) {
      alert("You have already submitted your feedback.");
      return;
    }
    setSelectedRating(rating); // Update the selected rating
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    // Save feedback to local storage

    // Log feedback (replace with API call if needed)
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Write Your Feedback
      </h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={25}
                  onClick={() => handleRatingClick(star)}
                  className={`cursor-pointer ${
                    star <= selectedRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Leave a Comment
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write your opinion about our service."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-base text-gray-800">
            Thank you for your feedback!
          </h3>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
