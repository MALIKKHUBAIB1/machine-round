import { useEffect, useState } from "react";

function TrafficLight() {
  const [bg, setBg] = useState("");
  const [count, setCount] = useState(0);
  document.body.style.backgroundColor = "black";
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(() => count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    if (count === 5) {
      setBg("red");
    } else if (count === 10) {
      setBg("green");
    } else if (count === 15) {
      setBg("yellow");
      setCount(0);
    }
  }, [count]);

  function handleSetManullyLight() {
    setCount(5);
  }
 
  return (
    <div className="my-10 flex text-center">
      <div
        className={`w-24 h-24 ${
          bg === "red" ? "bg-red-700" : ""
        } rounded-full mx-2 ring-red-50 ring-2`}
      >
        red
      </div>
      <div
        className={`w-24 h-24 ${
          bg === "green" ? "bg-green-500" : ""
        } rounded-full mx-2 ring-red-50 ring-2`}
      >
        Green
      </div>
      <div
        className={`w-24 h-24 ${
          bg === "yellow" ? "bg-yellow-500" : ""
        } rounded-full mx-2 ring-red-50 ring-2`}
      >
        Yellow
      </div>
      <div>
        <button
          className="w-24 p-2 text-white border border-white m-2"
          onClick={handleSetManullyLight}
        >
          manualy set
        </button>
      </div>
    </div>
  );
}

export default TrafficLight;
