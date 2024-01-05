import React, { createContext, useState } from "react";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <AppContext.Provider value={{ isLoggedIn,setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;
