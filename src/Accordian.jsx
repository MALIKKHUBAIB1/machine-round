import React from "react";

function Accordian({ data, show, handleSHowAccordian, index }) {
  return (
    <div className="border border-blue-600 rounded-lg p-4 m-2 shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer transition-colors hover:bg-blue-50 p-2 rounded-md"
        onClick={() => handleSHowAccordian(index)}
      >
        <h3 className="font-semibold text-lg text-blue-800">{data.title}</h3>
        <button
          className={`text-xl font-bold transition-transform transform ${
            show ? "rotate-45 text-red-600" : "rotate-0 text-blue-800"
          }`}
        >
          {show ? "−" : "+"}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          show ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 mt-4">{data.content}</p>
      </div>
    </div>
  );
}

export default Accordian;
