import React, { useEffect, useState } from "react";
import { initDb, insertData } from "../../utils/indexdb";

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
      await insertData(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetcData("https://dummyjson.com/products");
  }, []);

  return <div className="text-white">IndexDb</div>;
}

export default IndexDb;
