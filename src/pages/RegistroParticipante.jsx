import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";

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
  const navigate = useNavigate();

  const AVATAR_OPTIONS = [avatar1, avatar2, avatar3];

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
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
      const res = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      navigate("/participantes");
    } catch {
      setError("Error al registrar el participante.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-primary fw-bold">Registro de Participante</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" name="usuario_twitter" placeholder="Usuario de Twitter" value={form.usuario_twitter} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" name="ocupacion" placeholder="Ocupación" value={form.ocupacion} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <div className="mb-2 fw-bold">Selecciona tu avatar:</div>
          <div className="d-flex gap-3">
            {AVATAR_OPTIONS.map((img, i) => (
              <label key={i} className="d-flex flex-column align-items-center">
                <input
                  type="radio"
                  name="avatar"
                  value={img}
                  checked={form.avatar === img}
                  onChange={handleAvatarChange}
                  className="mb-1"
                  required
                />
                <img
                  src={img}
                  alt={`Avatar ${i + 1}`}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: form.avatar === img ? "2px solid #0d6efd" : "1px solid #bbb",
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" id="terminos" type="checkbox" name="terminos" checked={form.terminos} onChange={handleChange} required />
          <label htmlFor="terminos" className="form-check-label">
            Acepto los términos y condiciones
          </label>
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default RegistroParticipante;
