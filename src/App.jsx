import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ThemeContext } from "./Context/ThemeContext"; // Importe o ThemeContext

const App = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use o ThemeContext

  return (
    <>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
