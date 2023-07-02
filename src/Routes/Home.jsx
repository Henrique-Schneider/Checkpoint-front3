import { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";

const Home = () => {
  const [dentistas, setDentistas] = useState([]);

  useEffect(() => {
    const fetchDentistas = async () => {
      try {
        const response = await axios.get(
          "https://dhodonto.ctdprojetointegrador.com/dentista"
        );
        const data = response.data;
        setDentistas(data);
      } catch (error) {
        console.log(error);
        console.log("Lista de dentistas vazia!");
      }
    };

    fetchDentistas();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentistas.map((dentista) => (
          <Card key={dentista.matricula} dentista={dentista} />
        ))}
      </div>
    </>
  );
};

export default Home;
