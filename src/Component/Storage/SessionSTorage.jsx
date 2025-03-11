import React, { useEffect, useState } from "react";

function IndexDb() {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.style.background = "black";
  }, []);
  async function fetcData(url) {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setData(data?.products);
      sessionStorage.setItem("product", JSON.stringify(data?.products));
      sessionStorage.setItem("product", JSON.stringify(false));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    const getDataFromSession = JSON.parse(sessionStorage.getItem("product"));
    if (getDataFromSession) {
      console.log("setting from cache ");
      setData(getDataFromSession);
    } else fetcData("https://dummyjson.com/products");
  }, []);

  if (loading) {
    return <p className="text-white text-3xl">loading.....</p>;
  }

  return (
    <div className="text-white">
      {data.map((data) => {
        return <h2 key={data.id}>{data.title}</h2>;
      })}
    </div>
  );
}

export default IndexDb;
