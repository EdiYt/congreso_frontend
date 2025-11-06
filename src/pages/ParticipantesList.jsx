import React, { useEffect, useState } from "react";
import ParticipanteCard from "../components/ParticipanteCard";
import { Link, useNavigate } from "react-router-dom";
import ticImg from "../assets/tic.png";
import menuImg from "../assets/menu.png";
import "../styles/participantesList.css";

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
    <div className="participantes-bg">
      <div className="participantes-header d-flex align-items-center justify-content-between border-bottom mb-5 px-4">
        <div className="header-logo">
          <img src={ticImg} alt="Logo TICs" className="img-fluid" style={{ maxWidth: 120 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="participantes-titulo text-center">Asistentes registrados</h2>
        </div>
        <div className="header-menu position-relative">
          <img
            src={menuImg}
            alt="Menú"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 1px 7px #ccc",
              border: "1.5px solid #e5e5e9",
              padding: "6px"
            }}
            tabIndex={0}
          />
          {menuOpen && (
            <div className="bg-white rounded shadow p-2 position-absolute" style={{ zIndex: 30, top: 42, right: 0 }}>
              <button className="dropdown-item" onClick={() => handleNavigate("/")}>Inicio</button>
              <button className="dropdown-item" onClick={() => handleNavigate("/participantes")}>Listado</button>
              <button className="dropdown-item" onClick={() => handleNavigate("/registro")}>Registro</button>
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <form onSubmit={handleSearchSubmit} className="input-group mb-3 participantes-search-form">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={search}
              onChange={handleSearchChange}
            />
            <button className="participantes-btn participantes-btn-buscar" type="submit">
              Buscar
            </button>
          </form>
          <Link to="/registro" className="participantes-btn participantes-btn-registro px-4">
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