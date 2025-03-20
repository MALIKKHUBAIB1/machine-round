import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import Modal from "../../utils/Modal";

function Effetc() {
  const [price, setPrice] = useState("");
  const [produtName, setProductName] = useState("");
  const [produts, setProducts] = useState([]);
  const [showListOnUi, setShowOnui] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (price.trim() === "" || produtName.trim() === "") {
      alert("Field is empty, please fill details");
      return;
    }
    setProducts((prev) => [
      ...prev,
      { price, name: produtName, id: Date.now() },
    ]);
    setIsOpen(true);
  }

  useEffect(() => {
    insertDBData("pd", produts);
    getAllData("pd").then((storedProducts) => {
      if (storedProducts.length === 0) return;
      setShowOnui(storedProducts);
    });
  }, [produts]);

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Product Name */}
        <input
          type="text"
          placeholder="Enter product name"
          value={produtName}
          className="p-3 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setProductName(e.target.value)}
        />

        {/* ✅ Product Price */}
        <input
          type="text"
          value={price}
          placeholder="Enter product price"
          className="p-3 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* ✅ Modern Modal */}
      <Modal isOpen={isOpen}>
        <h1>Products</h1>
        <div className="space-y-2">
          {showListOnUi.map((pd) => (
            <div key={pd.id} className="product-item">
              <span className="text-gray-800 font-medium">{pd.name}</span>
              <span className="text-blue-600 font-semibold">₹{pd.price}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setIsOpen(false)} className="close-btn">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Effetc;

async function initDb(dbName) {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(dbName)) {
        db.createObjectStore(dbName, { keyPath: "id" });
      }
    },
  });
  return db;
}

async function insertDBData(dbName, products) {
  const db = await initDb(dbName);
  const txn = db.transaction(dbName, "readwrite");
  const store = txn.objectStore(dbName);
  for (let i = 0; i < products.length; i++) {
    store.put(products[i]);
  }
  await txn.done;
}

async function getAllData(dbName) {
  const db = await initDb(dbName);
  const txn = db.transaction(dbName, "readonly");
  const store = txn.objectStore(dbName);
  return store.getAll();
}
