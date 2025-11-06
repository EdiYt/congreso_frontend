import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ticImg from "../assets/tic.png";
import menuImg from "../assets/menu.png";
import "../styles/headerMenu.css";

const HeaderMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (ruta) => {
    setMenuOpen(false);
    navigate(ruta);
  };

  return (
    <div className="header-menu-bar">
      <div className="header-logo">
        <img src={ticImg} alt="Logo TICs" style={{ maxWidth: 120 }} />
      </div>
      <div className="header-menu">
        <img
          src={menuImg}
          alt="Menú"
          onClick={() => setMenuOpen(v => !v)}
          tabIndex={0}
        />
        {menuOpen && (
          <div className="menu-dropdown">
            <button className="dropdown-item" onClick={() => handleNavigate("/")}>Inicio</button>
            <button className="dropdown-item" onClick={() => handleNavigate("/participantes")}>Listado</button>
            <button className="dropdown-item" onClick={() => handleNavigate("/registro")}>Registro</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;