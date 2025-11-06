import { useNavigate } from "react-router-dom";
import universidadImg from "../assets/universidad.png";
import ticImg from "../assets/tic.png";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate("/participantes");
  };

  return (
    <div className="home-bg">
      <div className="home-logos-row">
        <img src={universidadImg} alt="Logo Universidad" className="home-logo-img" />
        <img src={ticImg} alt="Logo Congreso TICs" className="home-logo-img" />
      </div>
      <h1 className="home-title">Congreso TICs Full Stack</h1>
      <button className="btn btn-primary btn-lg mt-3 shadow" onClick={handleEntrar}>
        Entrar
      </button>
    </div>
  );
};

export default Home;
