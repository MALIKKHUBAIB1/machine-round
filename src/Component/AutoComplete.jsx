import React, { useEffect, useRef, useState } from "react";
function AutoComplete() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [cache, setCache] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected index
  let timer = useRef(null);

  async function fetchData() {
    if (!query) return;
    const resp = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    const respData = await resp.json();
    setCache((prev) => ({
      ...prev,
      [query]: respData.recipes,
    }));
    setData(respData.recipes);
  }

  useEffect(() => {
    if (cache[query]) {
      setData(cache[query]);
      return;
    }
    timer.current = setTimeout(fetchData, 400);
    return () => clearTimeout(timer.current);
  }, [query]);

  function focusHandler() {
    setShow(true);
  }

  function handleHideBlur() {
    setShow(false);
    setSelectedIndex(null);
  }

  // Handle keyDown event for ArrowDown and ArrowUp
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      if (selectedIndex === data.length - 1) return;
      setSelectedIndex((prevIndex) => (prevIndex === null ? 0 : prevIndex + 1));
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)
      );
    }
  }
  
  // Handle keyUp if needed for any final actions (like selection)
  function handleKeyUp(e) {
    if (e.key === "Enter" && selectedIndex !== null) {
      console.log("Selected recipe:", data[selectedIndex].name);
      // You can perform actions on selection, like showing detailed info
    }
  }

  return (
    <div>
      <h1 className="font-bold text-2xl m-6">AutoComplete</h1>
      <div>
        <input
          className="p-4 w-full border-slate-950 border"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for the cuisine"
          onFocus={focusHandler}
          onBlur={handleHideBlur}
          onKeyDown={handleKeyDown} // Added keyDown handler
          onKeyUp={handleKeyUp} // Added keyUp handler
        />
      </div>
      {show && (
        <div>
          {!data.length ? (
            <h1 className="text-red-400">No data found...</h1>
          ) : (
            <div className="w-full border-slate-950 border h-auto max-h-96 overflow-y-scroll">
              {data.map((item, index) => {
                const isSelected = index === selectedIndex; // Check if this item is selected
                return (
                  <div
                    key={item.id}
                    className={`flex mx-7 items-center cursor-pointer hover:bg-slate-200 ${
                      isSelected ? "bg-slate-300" : ""
                    }`} // Highlight selected item
                  >
                    <img
                      src="https://static-00.iconduck.com/assets.00/search-icon-512x512-0apibful.png"
                      className="w-4 h-4"
                    />
                    <h2 className="text-start font-bold p-2">{item.name}</h2>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
