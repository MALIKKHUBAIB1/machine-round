import { useEffect, useState } from "react";

function Pagination() {
  const [query, setQueary] = useState();
  const [skipItem, setSkitItem] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  async function fetchData() {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
        skipItem * itemPerPage
      }`
    );
    const data = await res.json();
    setQueary(data);
  }
  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [skipItem, itemPerPage]);
  if (!query) return;
  let btn = new Array(Math.floor(query.total / 10) + 1).fill(0);
  // for (let i = 1; i <= Math.floor(query.total / 10); i++) {
  //   btn.push(i);
  // }
  function pageButtonSkip(i) {
    setSkitItem(i);
  }
  function handleNextPage() {
    setSkitItem((prev) => prev + 1);
  }
  function handlePrevPage() {
    setSkitItem((prev) => prev - 1);
  }
  console.log(skipItem);
  // console.log(Math.floor(query.total / 10) - 1=== skipItem / 10);
  // console.log(skipItem === Math.floor(query.total / 10));
  return (
    <div className="text-white my-10">
      <div className="flex gap-4 w-full flex-wrap">
        {query &&
          query.products.map((item) => {
            return (
              <div key={item.id} className="w-80 shadow-2xl border border-white">
                <img
                  src={item.images[0]}
                  className="object-contain h-80 "
                />
                <h1 className="text-yellow-600 text-2xl mb-4">{item.title}</h1>
                <p className="text-yellow-600 text-justify mx-6">
                  {item.description}
                </p>
              </div>
            );
          })}
      </div>
      <button
        className="underline text-blue-600 m-2 font-bold text-lg"
        disabled={skipItem === 0}
        onClick={handlePrevPage}
      >
        Prev
      </button>
      {btn &&
        btn.map((i, index) => {
          return (
            <button
              key={index}
              className={` p-3 border border-blue-900 m-2 rounded-full ${
                skipItem === index ? "font-bold underline text-blue-600" : ""
              }`}
              onClick={() => pageButtonSkip(index)}
            >
              {index + 1}
            </button>
          );
        })}
      <button
        className="underline text-blue-600 m-2 font-bold text-lg"
        onClick={handleNextPage}
        disabled={Math.floor(query.total / 10) === skipItem}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
