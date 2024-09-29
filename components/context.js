import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const value = {
    isAuthenticated: false,
    setIsAuthenticated: false,
    cart: {},
    setCart: {},
    addItemFunct: () => {},
    setAddItemFunct: {},
    removeItemFunct: () => {},
    setRemoveItemFunct: {},
    user: false,
    setUser: false,
    userFunct: () => {},
    setUserFunct: {},
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
