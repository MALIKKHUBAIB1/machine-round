import React, { useEffect, useRef, useState } from "react";

function OtpForm() {
  const [currentIndex, setCueerntIndex] = useState(0);
  const [input, setInput] = useState(Array.from({ length: 5 }).fill(""));
  const inputRef = useRef([]);

  
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    console.log("called ");
  }, []);


  function inputChaneHandler(index, value) {
    console.log(index);
    console.log(value);
    if (!value) return;
    const newInput = [...input];
    newInput[index] = value;
    setInput(newInput);
    console.log(inputRef);
    if (value && index < input.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    console.log(inputRef);
  }
  console.log(input);
  function focusHandler() {
    // if (currentIndex && input[currentIndex].length === 1)
  }
  function handleKeyDown(index, e) {
    console.log(e.key);
    if (e.key === "Backspace") {
      const newInput = [...input];
      newInput[index] = "";
      setInput(newInput);
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }

    // if(e.target)
  }
  return (
    <div>
      OtpForm
      <div>
        {input.map((value, i) => {
          return (
            <input
              key={i}
              value={value}
              onChange={(e) => inputChaneHandler(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={focusHandler}
              ref={(el) => (inputRef.current[i] = el)} // Store ref for each input
              className="p-4 border border-cyan-950 w-14 m-2 rounded-md text-red-800"
            />
          );
        })}
      </div>
    </div>
  );
}

export default OtpForm;
