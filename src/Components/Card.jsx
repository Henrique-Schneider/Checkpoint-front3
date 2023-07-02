import React, {useContext } from "react";
import styles from "./Card.module.css";
import { ThemeContext } from "../Context/ThemeContext";

const Card = ({dentista}) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <>
      
        <div key={dentista.matricula} className={`card ${darkMode ? styles.cardDark : ""}`}>
          <img
            className="card-img-top"
            src="/images/doctor.jpg"
            alt="doctor placeholder"
          />
          <div className={`card-body ${darkMode ? styles.cardDark : ""}`}>
            <a href={`/dentista/${dentista.matricula}`}>
              <h5 className={`card-title ${styles.title}`}>
                {dentista.nome} {dentista.sobrenome}
              </h5>
            </a>
          </div>
        </div>
     
    </>
  );
};

export default Card;
