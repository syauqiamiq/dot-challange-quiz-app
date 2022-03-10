import React, { createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  return <LoginContext.Provider>{children}</LoginContext.Provider>;
};
