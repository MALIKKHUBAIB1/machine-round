import React, { useState, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current++; // This value persists between renders

  return (
    <div>
      <p>Count: {count}</p>
      <p>Component Rendered: {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;

