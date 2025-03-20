import React, { useEffect, useState } from "react";
import { deleteById, getAllData, insertDBData } from "../../utils/indexdb";
import Effetc from "./Effetc";

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
      await insertDBData(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getData() {
      const dbData = await getAllData("product");
      console.log(dbData);
      if (dbData.length !== 0) {
        setData(dbData);
        console.log("setting data from indexDb ");
      } else fetcData("https://dummyjson.com/products");
    }
    getData();
  }, []);

  deleteById(1);
  return (
    <div className="text-white">
      {data.map((product) => (
        <h2 key={product.id}>{product.title}</h2>
      ))}

      <Effetc />
    </div>
  );
}

export default IndexDb;
