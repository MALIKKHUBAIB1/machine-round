import { createContext, useReducer, useState } from "react";

const CartContextdf = createContext({
  name: "cart",
  addtoCart: () => {},
  carts: [],
});
function reducer(state, action) {
  switch (action.type) {
    case "add":
      const findItem = state.find((item) => item.id === action.payload.id);
      if (findItem) {
        return state;
      } else {
        const newCart = [...state, action.payload];
        return newCart;
      }
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const [state, dispacth] = useReducer(reducer, carts);
  function addtoCart(product) {
    dispacth({ type: "add", payload: product });
  }
  return (
    <CartContextdf.Provider value={{ carts: state, addtoCart }}>
      {children}
    </CartContextdf.Provider>
  );
}

export default CartProvider;

export { CartContextdf };
