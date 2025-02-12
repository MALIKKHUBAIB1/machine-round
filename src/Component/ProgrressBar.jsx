import { useEffect, useState } from "react";

function ProgressBar() {
  const [width, setWidth] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setWidth((prevWidth) => (prevWidth >= 100 ? 10 : prevWidth + 10));
    }, 2000);

    return () => clearInterval(timer); // Clean up the interval
  }, []);

  document.body.style.backgroundColor = "black";

  return (
    <div className="text-yellow-600 w-[50%] m-auto ring-2 rounded-full h-6 my-10 items-center">
      <div
        className="bg-slate-50 h-6 rounded-md transition-all duration-1000 ease-in-out text-center font-bold text-xl" // Added transition class
        style={{ width: `${width}%` }}
      >
        {/* Optional content inside the progress bar */}
        {width}%
      </div>
    </div>
  );
}

export default ProgressBar;
