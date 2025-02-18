import React, { useEffect, useRef, useState } from "react";

function FormExcel() {
  const [input, setInput] = useState(Array.from({ length: 10 }).fill(""));
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const inputref = useRef([]);

  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  function inputChangeHandler(value, i) {
    const newInput = [...input];
    newInput[i] = value;
    setInput(newInput);
  }

  function handleDoubleClick(i) {
    if (!bgColor) return;
    if (inputref.current[i]) {
      inputref.current[i].focus();
      inputref.current[i].classList.remove(
        "bg-red-600",
        "bg-green-600",
        "bg-blue-600"
      );
      inputref.current[i].classList.add(bgColor);
    }
    setBgColor("");
  }
  console.log(inputref.current[1] && inputref.current[1].className);
  return (
    <div className="flex flex-wrap my-10">
      {input.map((value, i) => {
        return (
          <div key={i} className="m-2">
            <input
              className="p-3 border border-white rounded-md "
              ref={(e) => {
                if (e) {
                  inputref.current[i] = e;
                }
              }}
              value={value}
              onChange={(e) => inputChangeHandler(e.target.value, i)}
              onDoubleClick={() => handleDoubleClick(i)}
            />
          </div>
        );
      })}
      <button
        className="text-red-500 border border-white w-20"
        onClick={() => setBgColor("bg-red-600")}
      >
        red
      </button>
      <button
        className="text-green-600 border border-white w-20 mx-2"
        onClick={() => setBgColor("bg-green-600")}
      >
        Green
      </button>
      <button
        className="text-blue-600 border border-white w-20"
        onClick={() => setBgColor("bg-blue-600")}
      >
        Blue
      </button>
    </div>
  );
}

export default FormExcel;
