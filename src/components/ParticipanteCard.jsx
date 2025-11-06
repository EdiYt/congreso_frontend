import React from "react";

const ParticipanteCard = ({ participante }) => (
  <div className="card h-100 shadow-sm">
    <div className="card-body d-flex flex-column align-items-center text-center">
      <img
        src={participante.avatar}
        alt="avatar"
        style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 12 }}
      />
      <div className="fw-bold fs-5 mb-1">
        {participante.nombre} {participante.apellidos}
      </div>
      <div className="mb-1">@{participante.usuario_twitter.replace(/^@/, "")}</div>
      <div>{participante.ocupacion}</div>
    </div>
  </div>
);

export default ParticipanteCard;