import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import styles from "./Navbar.module.css"
const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza de que deseja sair?");
    if (confirmLogout) {
      logout();
      localStorage.removeItem("jwtToken"); // Remova o token JWT do armazenamento local do navegador
      // Lógica adicional após o logoff, se necessário
      console.log("Usuário saiu com sucesso");
      navigate("/home");
    }
  };

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
        aria-label="Third navbar example"
      >
        <div className="container">
          <Link className="navbar-brand" to="/home">
            DH Odonto
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className={`navbar-nav mb-2 mb-sm-0 ${styles.NavLoginLogout}`}>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/consulta">
                  Consulta
                </Link>
              </li>
              <li className="nav-item">
                {loggedIn ? (
                  <button
                    className={`btn ${
                      darkMode ? "btn-light" : "btn-dark"
                    } btn-sm`}
                    onClick={handleLogout}
                  >
                    Log Off
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <button
                  className={`btn ${
                    darkMode ? "btn-light" : "btn-dark"
                  } btn-sm`}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
