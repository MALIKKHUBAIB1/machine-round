// import { openDB } from "idb";

// // ✅ Initialize the IndexedDB
// async function initDb(name) {
//   const db = await openDB(name, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(name)) {
//         // ✅ Fixed `contains`
//         db.createObjectStore(name, { keyPath: "id" });
//       }
//     },
//   });
//   return db;
// }

// // ✅ Insert Data into IndexedDB
// async function insertData(products) {
//   console.log(products);
//   const db = await initDb("product");
//   const tx = db.transaction("product", "readwrite"); // ✅ Fixed `transaction`
//   const store = tx.objectStore("product"); // ✅ Fixed `objectStore`

//   // ✅ Directly insert the object (no need for JSON.stringify)
//   products.forEach((product) => {
//     store.put(product);
//   });

//   await tx.done;
//   console.log("Data inserted into IndexedDB");
// }

// export { initDb, insertData };


