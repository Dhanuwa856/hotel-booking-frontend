import React from "react";

export const StatusCard = (props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-between gap-2 mb-4">
        <p className="text-md font-medium text-gray-700">{props.label}</p>
        <span className={`text-xl ${props.color}`}>{props.icon}</span>
      </div>
      <h2 className="text-3xl font-bold text-[#021c2e] mt-5">{props.value}</h2>
    </div>
  );
};
