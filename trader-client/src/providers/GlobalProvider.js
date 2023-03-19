import React, { createContext, useDispatch, useContext, useReducer } from "react";
export const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const value = { state, dispatch };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const globalReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`Unhandled action ${action.type}`);
  }
};

const initialState = {};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used with GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
