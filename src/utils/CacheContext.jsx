import { createContext, useState } from "react";

export const CachedContext = createContext({
  data: {},
  addData() {},
});

function CachedContextProvider({ children }) {
  const [data, setData] = useState({});
  const addData = (key, data) => {
    if (!data) return;
    setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), data],
    }));
  };
  
  return (
    <CachedContext.Provider value={{ data, addData }}>
      {children}
    </CachedContext.Provider>
  );
}
export default CachedContextProvider;
