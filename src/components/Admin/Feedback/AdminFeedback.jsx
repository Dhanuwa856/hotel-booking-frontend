import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(null);
  const [editFeedback, setEditFeedback] = useState(null);

  const apiGetAllUrl = `${import.meta.env.VITE_API_URL}/feedback/all`;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(apiGetAllUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedbacks(res.data.feedback);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
      });
  }, []);

  // Handle feedback status update
  const handleStatusChange = (id, newStatus) => {
    const apiUpdateURL = `${import.meta.env.VITE_API_URL}/feedback/${id}`;
    const token = localStorage.getItem("userToken");

    axios
      .put(
        apiUpdateURL,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Update feedback status in the UI only after a successful update
        const updatedFeedbacks = feedbacks.map((feedback) =>
          feedback.feedback_id === id
            ? { ...feedback, status: newStatus }
            : feedback
        );
        setFeedbacks(updatedFeedbacks);
        setEditFeedback(null);
      })
      .catch((err) => {
        console.error("Error updating feedback status:", err);
      });
  };

  if (!feedbacks) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Admin Feedback
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Feedback ID</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Content</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {feedbacks.map((feedback) => (
              <tr
                key={feedback.feedback_id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-6 text-left">{feedback.feedback_id}</td>
                <td className="py-3 px-6 text-left">{feedback.email}</td>
                <td className="py-3 px-6 text-left">
                  {feedback.firstName} {feedback.lastName}
                </td>
                <td className="py-3 px-6 text-left">{feedback.content}</td>
                <td className="py-3 px-6 text-left">{feedback.rating}</td>
                <td className="py-3 px-6 text-left">
                  {editFeedback === feedback.feedback_id ? (
                    <select
                      value={feedback.status}
                      onChange={(e) =>
                        setFeedbacks((prev) =>
                          prev.map((fb) =>
                            fb.feedback_id === feedback.feedback_id
                              ? { ...fb, status: e.target.value }
                              : fb
                          )
                        )
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span
                      className={`py-1 px-2 rounded-full text-xs font-semibold ${
                        feedback.status === "approved"
                          ? "bg-green-100 text-green-500"
                          : feedback.status === "pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {feedback.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editFeedback === feedback.feedback_id ? (
                    <button
                      onClick={() =>
                        handleStatusChange(
                          feedback.feedback_id,
                          feedback.status
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditFeedback(feedback.feedback_id)}
                      className="bg-blue-500 text-[12px] font-medium text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedback;
