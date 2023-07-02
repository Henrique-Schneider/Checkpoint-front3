import React, { createContext, useReducer } from "react";

// Crie o contexto global
export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
  loggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    // Forneça os valores do contexto para os componentes filhos
    <ThemeContext.Provider
      value={{
        darkMode: state.darkMode,
        toggleDarkMode,
        loggedIn: state.loggedIn,
        handleLogout,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;