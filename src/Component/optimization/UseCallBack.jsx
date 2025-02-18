import React, { useEffect, useState, useCallback, useMemo } from "react";
import Button from "./Button";
import Counter from "./Ref";

function UseCallBack() {
  const [products, setProducts] = useState([]);
  const [status, setStaus] = useState(false);
  const [retyCount, setRetryCount] = useState(0);
  const maxtry = 5;

  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  // const handleSubmit = useCallback(() => {
  //   let newCount = count + 1;
  //   setCount(newCount);
  //   // console.log("log");
  // }, [count]);

  // const handleSubmit = () => {
  //   let newCount = count + 1;
  //   setCount(newCount);
  //   // console.log("log");
  // };
  // function checkd() {
  //   setCount1(count1 + 1);
  // }

  //if the api call is not make due to the some newtWork error so can we make the api call again

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
        console.log("reached ");
        setRetryCount(0);
        setStaus(false);
      } catch (error) {
        setStaus(true);
      }
    };
    let timer;
    if (status) {
      setRetryCount((preVCount) => preVCount + 1);
      timer = setTimeout(() => {
        if (maxtry > retyCount) {
          fetchedData();
        } else {
          return;
        }
        console.log("called every time after the 900ms ");
      }, 900);
    } else {
      fetchedData();
    }
    return () => clearInterval(timer);
  }, [status]);

  const userData = useMemo(() => {
    return products.filter((product) => product.price > 10);
  }, [products]);

  console.log(userData);

  return (
    <div className="text-yellow-600 my-10">
      {console.log("render useCallback compoennt")}
      <h2 className="text-2xl">
        UseCallBack : persist the function between the render
      </h2>

      <button
        className="text-yellow-500 p-3 border w-24"
        // onClick={expensiveCal}
      >
        Clicked
      </button>
      {/* <Button /> */}
      <Counter />
    </div>
  );
}

export default UseCallBack;
