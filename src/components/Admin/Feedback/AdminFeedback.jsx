import React, { useState } from "react";

const AdminFeedback = () => {
  // Sample feedback data
  const [feedbacks, setFeedbacks] = useState([
    {
      feedback_id: 1001,
      email: "johndoe@example.com",
      firstName: "John",
      lastName: "Doe",
      content: "Great service, but the room was a bit small.",
      rating: 4,
      status: "pending",
      submittedAt: new Date(),
    },
    {
      feedback_id: 1002,
      email: "janedoe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      content: "Excellent stay, loved the experience.",
      rating: 5,
      status: "approved",
      submittedAt: new Date(),
    },
  ]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedFeedbacks = feedbacks.map((feedback) =>
      feedback.feedback_id === id
        ? { ...feedback, status: newStatus }
        : feedback
    );
    setFeedbacks(updatedFeedbacks);
  };

  // Handle content change
  const handleContentChange = (id, newContent) => {
    const updatedFeedbacks = feedbacks.map((feedback) =>
      feedback.feedback_id === id
        ? { ...feedback, content: newContent }
        : feedback
    );
    setFeedbacks(updatedFeedbacks);
  };

  return (
    <div className="p-8 w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Admin Feedback
        </h2>
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-4 border">Feedback ID</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Content</th>
              <th className="py-3 px-4 border">Rating</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedback_id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border text-center">
                  {feedback.feedback_id}
                </td>
                <td className="py-3 px-4 border text-center">
                  {feedback.email}
                </td>
                <td className="py-3 px-4 border text-center">
                  {feedback.firstName} {feedback.lastName}
                </td>
                <td className="py-3 px-4 border">
                  <textarea
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={feedback.content}
                    onChange={(e) =>
                      handleContentChange(feedback.feedback_id, e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-4 border text-center">
                  {feedback.rating}
                </td>
                <td className="py-3 px-4 border text-center">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={feedback.status}
                    onChange={(e) =>
                      handleStatusChange(feedback.feedback_id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="py-3 px-4 border text-center">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                    Save
                  </button>
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
