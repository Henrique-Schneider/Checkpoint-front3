import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useApi from "../Hooks/useApi";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";

const LoginForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });
  const [showLoading, setShowLoading] = useState(false);

  const { data, isLoading, error, shouldFetch } = useApi();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (data && !error) {
      localStorage.setItem("tokenJwt", data.token);
      authContext.login();

      setTimeout(() => {
        setShowLoading(false); // Definir showLoading como false após o atraso
        navigate("/home");
      }, 2000);
    }
  }, [data, error, authContext, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    await shouldFetch("auth", login);
  };

  return (
    <main>
      <div className={`text-center card container ${styles.card} ${styles.Container} ${darkMode ? styles.cardDark : ""}`}>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              type="password"
              required
            />
            <div className={styles.message}>
              {showLoading && isLoading && !authContext.successMessage && <span>Carregando...</span>}
              {error && <span>{error.message}</span>}
              {authContext.successMessage && <span className={styles.successMessage}>{authContext.successMessage}</span>}
              {authContext.errorMessage && <span className={styles.errorMessage}>{authContext.errorMessage}</span>}
            </div>
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
