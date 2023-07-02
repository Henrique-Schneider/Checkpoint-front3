import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiBaseUrl from "../api";
import styles from "./TabelaConsultas.module.css";
import { ThemeContext } from "../Context/ThemeContext";

const TabelaConsultas = () => {
  const { darkMode } = useContext(ThemeContext);
  const formatarData = (data) => {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1;
    const ano = dataFormatada.getFullYear();
    const hora = dataFormatada.getHours();
    const minutos = dataFormatada.getMinutes().toString().padStart(2, "0");

    return (
      <div>
        <div>
          Data: {dia}/{mes}/{ano} às {hora}H {minutos}M
        </div>
      </div>
    );
  };

  const [consultas, setConsultas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(consultas.length / itemsPerPage);

  const getCurrentConsultas = () => {
    if (totalPages === 1) {
      return [];
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return consultas.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/consulta`);
        const data = response.data;
        setConsultas(data);
      } catch (error) {
        console.log(error);
        console.log("Erro ao obter consultas!");
      }
    };

    fetchConsultas();
  }, []);

  return (
    <main className="container">
      <div
        className={`${styles["tabela-consultas"]} ${
          darkMode ? styles["dark-mode"] : ""
        }`}
      >
        <table className={`${styles["table"]} ${styles["custom-table"]}`}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Dentista</th>
              <th>Paciente</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentConsultas().map((consulta, index) => (
              <tr key={index}>
                <td>{formatarData(consulta.dataHoraAgendamento)}</td>
                <td>
                  {consulta.dentista.nome} {consulta.dentista.sobrenome}
                </td>
                <td>
                  {consulta.paciente.nome} {consulta.paciente.sobrenome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className={styles["pagination"]}>
            <button
              className={`${styles["btn"]} btn btn-primary`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              className={`${styles["btn"]} btn btn-primary`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default TabelaConsultas;
