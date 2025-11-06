import React, { useEffect, useState } from "react";
import ParticipanteCard from "../components/ParticipanteCard";
import { Link } from "react-router-dom";
import "../styles/participantes.css";

const ParticipantesList = () => {
  const [participantes, setParticipantes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const fetchParticipantes = async (filter = "") => {
    setLoading(true);
    try {
      // Cambia la URL al endpoint de tu backend
      const url = filter
        ? `http://localhost:3000/api/participantes?search=${encodeURIComponent(filter)}`
        : "http://localhost:3000/api/participantes";
      const res = await fetch(url);
      const data = await res.json();
      setParticipantes(data);
    } catch (error) {
      setParticipantes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchParticipantes(search);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Listado de Participantes</h2>
        <Link to="/registro" className="btn btn-success shadow-sm">
          Registrar nuevo
        </Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="input-group mb-5" style={{maxWidth:"400px"}}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-primary" type="submit">
          Buscar
        </button>
      </form>
      {loading ? (
        <div className="my-5 text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <span className="ms-2 text-primary">Cargando...</span>
        </div>
      ) : participantes.length === 0 ? (
        <p className="alert alert-warning mt-4 text-center">No se encontraron participantes.</p>
      ) : (
        <div className="row justify-content-center">
          {participantes.map((p) => (
            <div key={p.id} className="col-sm-10 col-md-6 col-lg-4 mb-4">
              <Link
                to={`/gafete/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ParticipanteCard participante={p} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantesList;