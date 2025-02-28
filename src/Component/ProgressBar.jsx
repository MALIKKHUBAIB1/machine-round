import React, { useEffect, useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    document.body.style.background = "#0f172a"; // Dark blueish background
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 10
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-white text-2xl font-semibold mb-4">Loading...</h2>
      <div className="w-80 bg-gray-800 rounded-full h-6 shadow-md overflow-hidden border border-gray-600">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-300 mt-2 text-sm">{progress}% Completed</p>
    </div>
  );
}

export default ProgressBar;
