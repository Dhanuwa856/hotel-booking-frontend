import React from "react";

const CircularProgress = ({ percentage, color }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e5e7eb" // Background stroke (gray)
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={`#${color}`} // Dynamic color
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex items-center justify-center text-lg font-semibold">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgress;
