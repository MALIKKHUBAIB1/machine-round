import React, { useEffect, useState } from "react";

function Page() {
  const [todos, setTodos] = useState([]);
  const [itemPerPage] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipItem, setSkitItem] = useState(0);
  const [btnLength, setBtnlngth] = useState(0);

  const FetchQuery = async () => {
    const url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${skipItem}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    setBtnlngth(data.total);
    setTodos(data.products);
  };

  useEffect(() => {
    FetchQuery();
  }, [skipItem]);

  function handlePageItem(i) {
    setSkitItem(itemPerPage * i);
    setCurrentIndex(i);
  }

  // UI-Level Pagination Logic
  // const startIndex = currentIndex * itemPerPage;
  // const lastIndex = startIndex + itemPerPage;
  // const currentItems = todos.slice(startIndex, lastIndex);

  function handleNext() {
    console.log(currentIndex);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex * itemPerPage < btnLength) {
        setSkitItem(itemPerPage * newIndex);
        return newIndex;
      }
      return prev;
    });
  }

  function handlePrev() {
    setCurrentIndex(currentIndex - 1);
    setSkitItem(skipItem - itemPerPage);
  }
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Product List */}
      <div className="border-4 border-cyan-900 flex flex-wrap justify-center gap-6 p-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border border-red-500 rounded-xl shadow-lg p-6 w-80 bg-white hover:scale-105 transition-transform duration-300"
          >
            <h1 className="text-xl font-semibold mb-2 text-gray-900">
              {todo.id} - {todo.title}
            </h1>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-900 text-white shadow-lg scale-110"
        >
          Prev
        </button>

        {Array.from({ length: Math.ceil(btnLength / itemPerPage) }).map(
          (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 
              ${
                i === currentIndex
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }
            `}
              onClick={() => handlePageItem(i)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-full font-semibold transition-all duration-300 bg-blue-900 text-white shadow-lg scale-110"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;
