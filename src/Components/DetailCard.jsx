import React, { useState, useEffect, useContext } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import axios from "axios";
import styles from "./DetailCard.module.css";
import apiBaseUrl from "../api"
import { useParams } from "react-router-dom"; // Importe o hook useParams
import { ThemeContext } from "../Context/ThemeContext";

const DetailCard = () => {
  const [dentista, setDentista] = useState(null);
  const { id } = useParams(); // Use o hook useParams para obter o parâmetro "id"
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchDentista = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/dentista?matricula=${id}`);
        const data = response.data;
        setDentista(data);
      } catch (error) {
        console.log(error);
        // Trate o erro de acordo com sua necessidade
      }
    };

    fetchDentista();
  }, [id]);

  if (!dentista) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Detalhes sobre o Dentista {dentista.nome} </h1>
      <section className={`card col-sm-12 col-lg-6 container ${darkMode ? styles.cardDark : " "}`}>
        <div className={`card-body row `}>
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className={`col-sm-12 col-lg-6 ${styles.FormDetailContainer} `}>
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {dentista.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.BtnLight}  ${darkMode ? styles.button : ""}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
