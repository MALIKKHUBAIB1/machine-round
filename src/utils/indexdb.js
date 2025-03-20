

import { openDB } from "idb";

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

async function insertDBData(products) {
  const db = await initDb("product");
  const tx = db.transaction("product", "readwrite");
  const store = tx.objectStore("product");
  Promise.all(products.map((product) => store.put(product)));
  await tx.done;
}


async function deleteById(id) {
  const db = await initDb("product");
  const tx = db.transaction("product", "readwrite");
  const store = tx.objectStore("product");
  await store.delete(id);
}

async function getAllData(dbName) {
  const db = await initDb(dbName);
  const tx = db.transaction(dbName, "readwrite");
  const store = tx.objectStore(dbName);
  return store.getAll();
}

export { insertDBData, deleteById, getAllData };
