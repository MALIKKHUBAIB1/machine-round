import { useEffect, useState } from "react";

function FetchQuery() {
  const [data, setData] = useState([]);
  const [itemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const cachedDuration = 1000;
  async function getData() {
    // const getCachedData = localStorage.getItem("cacheddata");
    // const getTimeStamp = JSON.parse(localStorage.getItem("gettime"));
    // const nowTime = Date.now();

    // if (
    //   getTimeStamp &&
    //   nowTime - getTimeStamp < cachedDuration &&
    //   getCachedData
    // ) {
    //   setData(JSON.parse(getCachedData));
    // } else {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/todos?limit=${itemPerPage}&skip=${page}`
    );
    const resData = await res.json();
    console.log(resData, "fetch");
    // localStorage.setItem("cacheddata", JSON.stringify(resData));
    // const now = Date.now();
    // localStorage.setItem("gettime", now.toString());
    const data = resData.todos;
    console.log(data);
    setData((prevdata) => [...prevdata, ...data]);
    setLoading(false);
    1;
    // }
  }

  function fetchData() {
    //how much i have scroled  window.scrollY
    // visble part is window.innerHeight
    // total heeight of the body is document.body.scrollHeight
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      console.log("redering...");
      setPage((prev) => prev + 1);
    }
  }
  useEffect(() => {
    getData();
  }, [page]);
  
  useEffect(() => {
    window.addEventListener("scroll", fetchData);
    return () => window.removeEventListener("scroll", fetchData);
  }, []);
  console.log(page);
  return (
    <div className="sticky">
      {loading && (
        <p className="bottom-0 left-0 fixed text-3xl text-red-500 inset-0 z-10 ">
          loading....
        </p>
      )}
      {data &&
        data.map((data, index) => {
          return (
            <li
              key={`${data.id}-${index}`}
              className="border border-blue-400 h-24 flex justify-center text-center"
            >
              {data.todo}
            </li>
          );
        })}
    </div>
  );
}

export default FetchQuery;
