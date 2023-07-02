import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import "./index.css";
import { GlobalProvider } from "./Context/GlobalContext";
import Consultas from "./Routes/Consultas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/consulta" element={<Consultas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dentista/:id" element={<Detail />} />
        </Route>
      </Routes>
    </GlobalProvider>
  </BrowserRouter>
);