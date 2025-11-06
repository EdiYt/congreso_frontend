import React, { useEffect, useState } from "react";
import ParticipanteCard from "../components/ParticipanteCard";
import { Link, useNavigate } from "react-router-dom";
import ticImg from "../assets/tic.png";
import "../styles/participantes.css";

const ParticipantesList = () => {
  const [participantes, setParticipantes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const fetchParticipantes = async (filter = "") => {
  setLoading(true);
  try {
    let url;
    if (!filter) {
      url = "http://localhost:3000/api/listado";
    } else {
      url = `http://localhost:3000/api/listado/buscar?q=${encodeURIComponent(filter)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setParticipantes(Array.isArray(data) ? data : []);
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

  const handleNavigate = (ruta) => {
    setMenuOpen(false);
    navigate(ruta);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      {/* Header */}
      <div className="row py-4 align-items-center border-bottom">
        <div className="col-2 text-start">
          <img src={ticImg} alt="Logo TICs" className="img-fluid" style={{ maxWidth: 120 }} />
        </div>
        <div className="col-8 text-center">
          <h2 className="fw-bold text-primary">Asistentes registrados</h2>
        </div>
        <div className="col-2 text-end position-relative">
          <div 
            className="menu-hamburguesa d-inline-block"
            style={{ cursor: "pointer" }} 
            onClick={() => setMenuOpen(v => !v)}>
            <span style={{display: 'block', height: 4, background:'#222', marginBottom:4, borderRadius: 2}} />
            <span style={{display: 'block', height: 4, background:'#222', marginBottom:4, borderRadius: 2}} />
            <span style={{display: 'block', height: 4, background:'#222', borderRadius: 2}} />
          </div>
          {menuOpen && (
            <div className="bg-white rounded shadow p-2 position-absolute" style={{zIndex:30, top:40, right:0}}>
              <button className="dropdown-item" onClick={() => handleNavigate("/")}>Inicio</button>
              <button className="dropdown-item" onClick={() => handleNavigate("/participantes")}>Listado</button>
              <button className="dropdown-item" onClick={() => handleNavigate("/registro")}>Registro</button>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="row justify-content-center mt-4 flex-grow-1">
        <div className="col-md-8">
          <form onSubmit={handleSearchSubmit} className="input-group mb-3">
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
          <Link to="/registro" className="btn btn-success mb-3">
            Registro
          </Link>
          {loading ? (
            <div className="my-5 text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <span className="ms-2 text-primary">Cargando...</span>
            </div>
          ) : participantes.length === 0 ? (
            <p className="alert alert-warning text-center">No se encontraron participantes.</p>
          ) : (
            <div className="row">
              {participantes.map((p) => (
                <div key={p.participante_id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                  <Link to={`/gafete/${p.participante_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <ParticipanteCard participante={p} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantesList;