import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = () => {
    setLoggedIn(true);
    setSuccessMessage("Login realizado com sucesso!");
    setErrorMessage("");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("tokenJwt");
    setSuccessMessage("Usuário saiu com sucesso!");
    setErrorMessage("");
    setTimeout(() => {
      navigate("/login"); // Redirecionar para a página de login
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, successMessage, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
