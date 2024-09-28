/* /context/AppContext.js */

import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [addItemFunct, setAddItemFunct] = useState(() => {});
  const [removeItemFunct, setRemoveItemFunct] = useState(() => {});
  const [user, setUser] = useState(false);
  const [userFunct, setUserFunct] = useState(() => {});

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        cart,
        setCart,
        addItemFunct,
        setAddItemFunct,
        removeItemFunct,
        setRemoveItemFunct,
        user,
        setUser,
        userFunct,
        setUserFunct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
