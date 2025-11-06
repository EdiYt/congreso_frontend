import React, { useState } from "react";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import HeaderMenu from "../components/HeaderMenu";
import "../styles/registro.css";

const RegistroParticipante = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    usuario_twitter: "",
    ocupacion: "",
    avatar: avatar1,
    terminos: false,
  });
  const [error, setError] = useState("");
  const AVATAR_OPTIONS = [avatar1, avatar2, avatar3];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarChange = (e) => {
    setForm((prev) => ({
      ...prev,
      avatar: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terminos) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }
    try {
      const res = await fetch("https://congreso-backend-jfg5.onrender.com/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      window.location.href = "/participantes";
    } catch {
      setError("Error al registrar el participante.");
    }
  };

  return (
    <div className="registro-bg d-flex flex-column align-items-center">
      <HeaderMenu />
      <form className="registro-formulario" onSubmit={handleSubmit}>
        <div className="registro-titulo">Registro de Participante</div>
        {error && <div className="alert alert-danger py-2 mb-2">{error}</div>}
        <div className="mb-4">
          <label className="registro-label">Nombre</label>
          <input className="form-control rounded-pill" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="registro-label">Apellidos</label>
          <input className="form-control rounded-pill" name="apellidos" value={form.apellidos} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="registro-label">Correo electrónico</label>
          <input className="form-control rounded-pill" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="registro-label">Usuario de Twitter</label>
          <input className="form-control rounded-pill" name="usuario_twitter" value={form.usuario_twitter} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="registro-label">Ocupación</label>
          <input className="form-control rounded-pill" name="ocupacion" value={form.ocupacion} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <div className="registro-label">Selecciona tu avatar:</div>
          <div className="registro-avatar-opciones">
            {AVATAR_OPTIONS.map((img, i) => (
              <label key={i} className="registro-avatar-radio d-flex flex-column align-items-center">
                <input
                  type="radio"
                  name="avatar"
                  value={img}
                  checked={form.avatar === img}
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  required
                />
                <img src={img} alt={`Avatar ${i + 1}`} />
              </label>
            ))}
          </div>
        </div>
        <div className="form-check registro-checkbox mb-4">
          <input className="form-check-input" id="terminos" type="checkbox" name="terminos" checked={form.terminos} onChange={handleChange} required />
          <label htmlFor="terminos" className="form-check-label">
            Acepto los términos y condiciones
          </label>
        </div>
        <button className="btn registro-btn w-100" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default RegistroParticipante;