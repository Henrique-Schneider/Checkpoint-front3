import React from "react";
import ThemeProvider from "./ThemeContext";
import { AuthProvider } from "./AuthContext";


const GlobalProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

export { GlobalProvider };
