import React, { useContext, useEffect, useState } from "react";
import { CartContextdf } from "../../utils/cart";

function CartContext() {
  const [products, setProduct] = useState([]);
  //   console.log(carts);
  const carts = useContext(CartContextdf);
  async function getData() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProduct(data.products);
  }

  useEffect(() => {
    getData();
  }, []);

  let shoJsx;

  if (!carts.carts || carts.carts.length === 0) {
    shoJsx = <CartItems cartItem={false} />;
  } else {
    shoJsx = carts.carts.map((cartItem, index) => (
      <CartItems key={index} cartItem={cartItem} />
    ));
  }

  return (
    <div className="flex flex-wrap gap-3">
      {products.slice(0, 10).map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
      {shoJsx}
    </div>
  );
}

export default CartContext;

function CartItems({ cartItem }) {
  return (
    <>
      {cartItem ? (
        <div>
          <h2>{cartItem.title}</h2>
          <p>{cartItem.description}</p>
        </div>
      ) : (
        <p>cart is empty</p>
      )}
    </>
  );
}
function ProductCard({ product }) {
  const carts = useContext(CartContextdf);

  function handleAddtoCard(pd) {
    carts.addtoCart(pd);
    console.log(carts);
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <img
        className="w-full"
        src={product?.images[0]}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
      <button
        className=" border-2 border-blue-500 p-3 w-40 hover:bg-zinc-800 hover:text-white"
        onClick={() => handleAddtoCard(product)}
      >
        add cart
      </button>
    </div>
  );
}
