import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import axios from "axios";

const ScheduleForm = () => {
  const [dentista, setDentista] = useState([]);
  const [paciente, setPaciente] = useState([]);

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const response = await axios.get(
          "https://dhodonto.ctdprojetointegrador.com/dentista"
        );
        const data = response.data;
        setDentista(data);
        console.log("Dentistas:", data);
      } catch (error) {
        console.log(error);
        console.log("Lista de dentista vazia!");
      }
    };
    fetchDentistas();

    const fetchPacientes = async () => {
      try {
        const response = await axios.get(
          "https://dhodonto.ctdprojetointegrador.com/paciente"
        );
        const data = response.data.body;
        if (Array.isArray(data)) {
          setPaciente(data);
        } else {
          console.log("Resposta da API para pacientes não é um array");
        }
      } catch (error) {
        console.log(error);
        console.log("Lista de paciente vazia!");
      }
    };
    fetchPacientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dentistId = document.getElementById("dentist").value;
    const patientId = document.getElementById("patient").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    const consultationData = {
      paciente: {
        matricula: patientId,
      },
      dentista: {
        matricula: dentistId,
      },
      dataHoraAgendamento: appointmentDate,
    };

    try {
      const response = await axios.post(
        "https://dhodonto.ctdprojetointegrador.com/consulta",
        consultationData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenJwt")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Consulta marcada com sucesso!");
      } else {
        alert("Ocorreu um erro ao marcar a consulta. Tente novamente.");
      }
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao marcar a consulta. Tente novamente.");
    }
  };

  return (
    <>
      <div className={`text-center container`}>
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {dentista.map((dentistas) => (
                  <option key={dentistas.matricula} value={dentistas.matricula}>
                    {dentistas.nome} {dentistas.sobrenome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select className="form-select" name="patient" id="patient">
                {paciente.map((pacientes) => (
                  <option key={pacientes.matricula} value={pacientes.matricula}>
                    {pacientes.nome} {pacientes.sobrenome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={`btn btn-light ${styles.button}`}
              type="submit"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
